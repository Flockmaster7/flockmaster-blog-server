import { Context, Next } from 'koa';
import ERROR from '../utils/Error';
import fs from 'fs';
import path from 'path';
import { markdownToTxt } from 'markdown-to-txt';

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
		} else {
			return ctx.app.emit('error', ERROR.uploadError, ctx);
		}
	} catch (error) {
		return ctx.app.emit('error', ERROR.uploadError, ctx, error);
	}
	await next();
};

// 校验上传文件格式
export const verifyUpload = async (ctx: Context, next: Next) => {
	try {
		const { file } = ctx.request.files!;
		const fileTypes = ['text/markdown', 'application/octet-stream'];
		if (!Array.isArray(file)) {
			if (!fileTypes.includes(file.mimetype!)) {
				return ctx.app.emit('error', ERROR.uploadError, ctx);
			}
			ctx.state.blog = file;
		} else {
			return ctx.app.emit('error', ERROR.uploadError, ctx);
		}
	} catch (error) {
		return ctx.app.emit('error', ERROR.uploadError, ctx, error);
	}
	await next();
};

//解析md文件成html
export const markdownRender = async (ctx: Context, next: Next) => {
	try {
		const blog = ctx.state.blog;
		const content = fs.readFileSync(
			path.resolve(__dirname, '../static/' + blog.newFilename),
			'utf-8'
		);
		const blogHtml = markdownToTxt(content).slice(0, 50);
		ctx.state.dataBlog = {
			content,
			blogHtml
		};
	} catch (error) {
		return ctx.app.emit('error', ERROR.markdownRenderError, ctx, error);
	}
	await next();
};

export const validatorBlogForm = async (ctx: Context, next: Next) => {
	try {
		ctx.verifyParams({
			title: 'string',
			classify: 'string',
			blog_image: 'string',
			content_html: 'string',
			content_text: 'string'
		});
	} catch (error) {
		return ctx.app.emit('error', ERROR.FormValidatorError, ctx, error);
	}
	await next();
};
