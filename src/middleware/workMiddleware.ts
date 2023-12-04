import { Context, Next } from 'koa';
import ERROR from '../utils/Error';

// 校验是否携带id参数
export const validatorId = async (ctx: Context, next: Next) => {
	try {
		ctx.verifyParams({
			id: 'string'
		});
	} catch (error) {
		return ctx.app.emit('error', ERROR.validatorIdError, ctx, error);
	}

	await next();
};

// 校验是否携带pageNum, pageSize
export const validatorPage = async (ctx: Context, next: Next) => {
	try {
		ctx.verifyParams({
			pageNum: 'string',
			pageSize: 'string'
		});
	} catch (error) {
		return ctx.app.emit('error', ERROR.validatorPageError, ctx, error);
	}

	await next();
};
