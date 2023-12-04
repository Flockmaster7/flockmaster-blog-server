import { Context } from 'koa';
import ERROR from '../utils/Error';
import { AddLeaveWordsWrapper } from '../types/leaveWords';
import Result from '../utils/Result';
import LeaveWordsServiceImpl from '../service/Implement/LeaveWordsServiceImpl';

const leaveWordsService = new LeaveWordsServiceImpl();

class LeaveWordsController {
	// 留言
	async addLeaveWord(ctx: Context) {
		try {
			const user_id = ctx.state.user.id;
			// 参数
			const wrapper: AddLeaveWordsWrapper = {
				user_id: 0,
				content: ''
			};
			const { content, parent_id, reply_to } = ctx.request.body;
			wrapper.content = content;
			wrapper.user_id = user_id;
			parent_id && (wrapper.parent_id = parent_id);
			reply_to && (wrapper.reply_to = reply_to);
			const res = await leaveWordsService.createLeaveWords(wrapper);
			ctx.body = new Result(200, '发布留言成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.addLeaveWordsError, ctx, error);
		}
	}

	// 查询留言列表
	async getLeaveWordList(ctx: Context) {
		try {
			const pageNum = ctx.params.pageNum;
			const pageSize = ctx.params.pageSize;
			const res = await leaveWordsService.getLeaveWords(
				pageNum,
				pageSize
			);
			ctx.body = new Result(200, '获取留言列表成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getLeaveWordsListError, ctx, error);
		}
	}

	//查询子留言
	async getChildrenLeaveWordList(ctx: Context) {
		try {
			const id = ctx.params.id;
			const pageNum = ctx.params.pageNum;
			const pageSize = ctx.params.pageSize;
			const res = await leaveWordsService.getChildLeaveWords(
				id,
				pageNum,
				pageSize
			);
			ctx.body = new Result(200, '获取留言列表成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getCommentListError, ctx, error);
		}
	}

	// 删除留言
	async removeLeaveWord(ctx: Context) {
		try {
			const id = ctx.params.id;
			const res = await leaveWordsService.deleteLeaveWords(id);
			if (res) {
				ctx.body = new Result(200, '删除留言成功', 'success');
			} else {
				ctx.app.emit('error', ERROR.removeLeaveWordsError, ctx);
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeLeaveWordsError, ctx, error);
		}
	}

	// 修改留言
	async updateLeaveWord(ctx: Context) {
		try {
			const id = ctx.params.id;
			const leaveWords = ctx.request.body;
			const res = await leaveWordsService.modifyLeaveWords(
				leaveWords,
				id
			);
			if (res) {
				ctx.body = new Result(200, '修改留言成功', 'success');
			} else {
				ctx.app.emit('error', ERROR.updateLeaveWordsError, ctx);
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updateLeaveWordsError, ctx, error);
		}
	}
}

export default LeaveWordsController;
