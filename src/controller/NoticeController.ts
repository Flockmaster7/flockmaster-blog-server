import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import NoticeServiceImpl from '../service/Implement/NoticeServiceImpl';
import Notice from '../model/Notice';

const noticeService = new NoticeServiceImpl();

class NoticeController {
	async getNoticeList(ctx: Context) {
		try {
			const wrapper = ctx.request?.body?.wrapper;
			const res = await noticeService.getList(
				Number(ctx.params.pageNum),
				Number(ctx.params.pageSize),
				wrapper
			);
			ctx.body = new Result(200, '获取通知列表成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getNoticeListError, ctx, error);
		}
	}

	async getNoticeDetail(ctx: Context) {
		try {
			const id = ctx.params.id;
			const res = await noticeService.getDetail(Number(id));
			ctx.body = new Result(200, '获取通知详情成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getNoticeDetailError, ctx, error);
		}
	}

	async createNotice(ctx: Context) {
		try {
			const { userId, messageId } = ctx.request.body;
			if (!userId || !messageId)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			const notice = new Notice();
			notice.userId = userId;
			notice.messageId = messageId;
			const res = await noticeService.addNotice(notice);
			if (res) {
				ctx.body = new Result<string>(200, '添加通知成功', 'success');
			} else {
				throw new Error('添加通知失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.addNoticeError, ctx, error);
		}
	}

	async updateNotice(ctx: Context) {
		try {
			const { id, userId, messageId } = ctx.request.body;
			if (!id)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			const notice = new Notice();
			notice.id = id;
			userId && (notice.userId = userId);
			messageId && (notice.messageId = messageId);
			const res = await noticeService.updateNotice(notice);
			if (res) {
				ctx.body = new Result<string>(200, '修改通知成功', 'success');
			} else {
				throw new Error('修改通知失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updateNoticeError, ctx, error);
		}
	}

	async removeNotice(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const res = await noticeService.removeNotice(id);
			if (res) {
				ctx.body = new Result<string>(200, '删除通知成功', 'success');
			} else {
				throw new Error('删除通知失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeNoticeError, ctx, error);
		}
	}
}

export default NoticeController;
