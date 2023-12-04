import { Context, Next } from 'koa';
import bcrpyt from 'bcryptjs';
import ERROR from '../utils/Error';
import UserService from '../service/userService';

const userService = new UserService();

// 校验登录或注册时提交的账号密码
const loginOrRegisterFormValidator = async (ctx: Context, next: Next) => {
	const { user_name, password } = ctx.request.body;
	if (!user_name || !password) {
		console.error('用户名或密码为空', ctx.request.body);
		ctx.app.emit('error', ERROR.userFormateError, ctx);
		return;
	}
	await next();
};

//注册时查看账号是否已存在
const userVerify = async (ctx: Context, next: Next) => {
	const { user_name } = ctx.request.body;
	try {
		const res = await userService.getUserInfo({ user_name });
		console.log(res);
		if (res) {
			console.error('用户已经存在', { user_name });
			ctx.app.emit('error', ERROR.userAlreadExist, ctx);
			return;
		}
	} catch (error) {
		console.error('用户注册失败', { user_name });
		ctx.app.emit('error', ERROR.userRegisterError, ctx);
	}
	await next();
};

// 对密码进行加密
const cryptPassword = async (ctx: Context, next: Next) => {
	const { password } = ctx.request.body;
	const salt = bcrpyt.genSaltSync(10);
	const hash = bcrpyt.hashSync(password, salt);
	ctx.request.body.password = hash;
	await next();
};

// 校验登录是否正确
const verifyLogin = async (ctx: Context, next: Next) => {
	const { user_name, password } = ctx.request.body;
	try {
		const res = await userService.getUserInfo({ user_name });
		if (!res?.password) {
			console.error('用户不存在', user_name);
			ctx.app.emit('error', ERROR.userDoesNotExist, ctx);
			return;
		}
		if (!bcrpyt.compareSync(password, res?.password as string)) {
			console.error('密码错误');
			ctx.app.emit('error', ERROR.validatPasswordError, ctx);
			return;
		}
	} catch (error) {
		console.error('用户登录失败', error);
		ctx.app.emit('error', ERROR.userLoginError, ctx);
		return;
	}
	await next();
};

//查看账号是否已存在
const userIsExist = async (ctx: Context, next: Next) => {
	const { user_name } = ctx.request.body;
	try {
		const res = await userService.getUserInfo({ user_name });
		console.log(res);
		ctx.state.userInfo = res;
		if (!res) {
			console.error('用户不存在', { user_name });
			ctx.app.emit('error', ERROR.userDoesNotExist, ctx);
			return;
		}
	} catch (error) {
		console.error('用户不存在', { user_name });
		// ctx.app.emit('error', ERROR.userRegisterError, ctx);
	}
	await next();
};

//根据id查看账号是否已存在
const userIsExistById = async (ctx: Context, next: Next) => {
	const id = ctx.params.id;
	try {
		const res = await userService.getUserInfo({ id });
		ctx.state.userInfo = res;
		if (!res) {
			console.error('用户不存在', { id });
			ctx.app.emit('error', ERROR.userDoesNotExist, ctx);
			return;
		}
	} catch (error) {
		console.error('用户不存在', { id });
		// ctx.app.emit('error', ERROR.userRegisterError, ctx);
	}
	await next();
};

export {
	loginOrRegisterFormValidator,
	userVerify,
	cryptPassword,
	verifyLogin,
	userIsExist,
	userIsExistById
};
