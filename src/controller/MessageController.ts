import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import MessageServiceImpl from '../service/Implement/MessageServiceImpl';
import Message from '../model/Message';

const messageService = new MessageServiceImpl();

class MessageController {
	async getMessageList(ctx: Context) {
		try {
			const wrapper = ctx.request?.body?.wrapper;
			const res = await messageService.getList(
				Number(ctx.params.pageNum),
				Number(ctx.params.pageSize),
				wrapper
			);
			ctx.body = new Result(200, '获取消息列表成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getMessageListError, ctx, error);
		}
	}

	async getMessageDetail(ctx: Context) {
		try {
			const id = ctx.params.id;
			const res = await messageService.getDetail(Number(id));
			ctx.body = new Result(200, '获取消息详情成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getMessageDetailError, ctx, error);
		}
	}

	async createMessage(ctx: Context) {
		try {
			const { content } = ctx.request.body;
			if (!content)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			const message = new Message();
			message.content = content;
			const res = await messageService.addMessage(message);
			if (res) {
				ctx.body = new Result<string>(200, '添加消息成功', 'success');
			} else {
				throw new Error('添加消息失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.addMessageError, ctx, error);
		}
	}

	async updateMessage(ctx: Context) {
		try {
			const { id, content } = ctx.request.body;
			if (!id)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			const message = new Message();
			message.id = id;
			content && (message.content = content);
			const res = await messageService.updateMessage(message);
			if (res) {
				ctx.body = new Result<string>(200, '修改消息成功', 'success');
			} else {
				throw new Error('修改消息失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updateMessageError, ctx, error);
		}
	}

	async removeMessage(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const res = await messageService.removeMessage(id);
			if (res) {
				ctx.body = new Result<string>(200, '删除消息成功', 'success');
			} else {
				throw new Error('删除消息失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeMessageError, ctx, error);
		}
	}
}

export default MessageController;
