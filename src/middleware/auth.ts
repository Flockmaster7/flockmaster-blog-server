import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import processEnv from '../config/config.default';
import ERROR from '../utils/Error';

// 判断token
const auth = async (ctx: Context, next: Next) => {
	const { authorization = '' } = ctx.request.header;
	const token = authorization.replace('Bearer ', '');
	try {
		const user = jwt.verify(token, processEnv.JWT_SECRET as string);
		ctx.state.user = user;
		console.log(ctx.state.user);
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

export { auth, isAdmin };
