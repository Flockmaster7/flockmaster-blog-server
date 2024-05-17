import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import processEnv from '../config/config.default';
import ERROR from '../utils/Error';
import Permission from '../model/Permission';

// 判断token，校验是否登录
const auth = async (ctx: Context, next: Next) => {
	const { authorization = '' } = ctx.request.header;
	const token = authorization.replace('Bearer ', '');
	try {
		const user = jwt.verify(token, processEnv.JWT_SECRET as string);
		ctx.state.user = user;
	} catch (error: any) {
		switch (error.name) {
			case 'TokenExpiredError':
				console.error('token已过期', error);
				return ctx.app.emit('error', ERROR.tokenExpiredError, ctx);
			case 'JsonWebTokenError':
				console.error('无效的token', error);
				return ctx.app.emit('error', ERROR.invalidTokenError, ctx);
		}
		return;
	}
	await next();
};

// 判断是否为管理员
const isAdmin = async (ctx: Context, next: Next) => {
	const { is_admin } = ctx.state.user;
	if (!is_admin) {
		console.error('没有管理员权限', ctx.state.user);
		return ctx.app.emit('error', ERROR.hasNotAdminPermission, ctx);
	}
	await next();
};

// 校验是否有权限
const authPermission = async (ctx: Context, next: Next) => {
	const permissionList: Permission[] = ctx.state.user?.roles[0]?.permissions;
	if (!permissionList)
		return ctx.app.emit('error', ERROR.permissionError, ctx);
	const res = permissionList.some((item: Permission) => {
		return ctx.request.url.includes(item.action);
	});
	if (res) {
		await next();
	} else {
		return ctx.app.emit('error', ERROR.permissionError, ctx);
	}
};

export { auth, isAdmin, authPermission };
