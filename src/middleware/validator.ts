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

// 校验文件
export const verifyUpload = async (ctx: Context, next: Next) => {
	try {
		const { file } = ctx.request.files!;
		const imgTypes = ['image/jpeg', 'image/png'];
		const videoTypes = ['video/mp4'];
		ctx.state.imageList = [];
		ctx.state.videoList = [];
		if (!Array.isArray(file)) {
			if (
				file.mimetype &&
				!imgTypes.includes(file.mimetype) &&
				!videoTypes.includes(file.mimetype)
			) {
				return ctx.app.emit('error', ERROR.uploadError, ctx);
			}
			if (file.mimetype && imgTypes.includes(file.mimetype)) {
				ctx.state.imageList.push(file);
			} else if (file.mimetype && videoTypes.includes(file.mimetype)) {
				ctx.state.videoList.push(file);
			}
		} else {
			for (const item of file) {
				if (
					item.mimetype &&
					!imgTypes.includes(item.mimetype) &&
					!videoTypes.includes(item.mimetype)
				) {
					return ctx.app.emit('error', ERROR.uploadError, ctx);
				}
				if (item.mimetype && imgTypes.includes(item.mimetype)) {
					ctx.state.imageList.push(item);
				} else if (
					item.mimetype &&
					videoTypes.includes(item.mimetype)
				) {
					ctx.state.videoList.push(item);
				}
			}

			// return ctx.app.emit('error', ERROR.uploadError, ctx);
		}
	} catch (error) {
		return ctx.app.emit('error', ERROR.uploadError, ctx, error);
	}
	await next();
};
