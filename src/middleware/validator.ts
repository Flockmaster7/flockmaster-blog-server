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

// 校验上传图片格式
export const verifyUploadImg = async (ctx: Context, next: Next) => {
	try {
		const { file } = ctx.request.files!;
		const fileTypes = ['image/jpeg', 'image/png'];
		if (!Array.isArray(file)) {
			if (!fileTypes.includes(file.mimetype!)) {
				return ctx.app.emit('error', ERROR.uploadError, ctx);
			}
			ctx.state.blog_img = file;
			ctx.state.img = file;
		} else {
			console.log(file);
			file.every((item) => {
				if (!fileTypes.includes(item.mimetype!)) {
					return ctx.app.emit('error', ERROR.uploadError, ctx);
				}
			});
			ctx.state.imgList = file;
			// return ctx.app.emit('error', ERROR.uploadError, ctx);
		}
	} catch (error) {
		return ctx.app.emit('error', ERROR.uploadError, ctx, error);
	}
	await next();
};
