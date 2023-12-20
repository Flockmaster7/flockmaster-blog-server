import { Context } from 'koa';
import { AddCommentWrapper } from '../types/comment';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import CommentServiceImpl from '../service/Implement/CommentServiceImpl';
import CommentDianzanServiceImpl from '../service/Implement/CommentDianzanServiceImpl';

const commentService: CommentServiceImpl = new CommentServiceImpl();
const commentDianzanService: CommentDianzanServiceImpl =
	new CommentDianzanServiceImpl();

class CommentController {
	// 文章评论
	async blogComment(ctx: Context) {
		try {
			const user_id = ctx.state.user.id;
			// 参数
			const wrapper: AddCommentWrapper = {
				blog_id: 0,
				user_id: 0,
				content: ''
			};
			const { blog_id, content, parent_id, reply_to } = ctx.request.body;
			wrapper.blog_id = blog_id;
			wrapper.content = content;
			wrapper.user_id = user_id;
			parent_id && (wrapper.parent_id = parent_id);
			reply_to && (wrapper.reply_to = reply_to);
			const res = await commentService.addComment(wrapper);
			ctx.body = new Result(200, '发布评论成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.addCommentError, ctx, error);
		}
	}

	// 查询评论列表
	async getCommentList(ctx: Context) {
		try {
			const id = ctx.params.id;
			const pageNum = ctx.params.pageNum;
			const pageSize = ctx.params.pageSize;
			const res = await commentService.getComment(id, pageNum, pageSize);
			ctx.body = new Result(200, '获取评论列表成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getCommentListError, ctx, error);
		}
	}

	//查询子评论
	async getChildrenCommentList(ctx: Context) {
		try {
			const id = ctx.params.id;
			const pageNum = ctx.params.pageNum;
			const pageSize = ctx.params.pageSize;
			const res = await commentService.getChildComment(
				id,
				pageNum,
				pageSize
			);
			ctx.body = new Result(200, '获取评论列表成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getCommentListError, ctx, error);
		}
	}

	// 删除评论
	async removeComment(ctx: Context) {
		try {
			const id = ctx.params.id;
			const res = await commentService.deleteComment(id);
			if (res) {
				ctx.body = new Result(200, '删除评论成功', 'success');
			} else {
				ctx.app.emit('error', ERROR.removeCommentError, ctx);
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeCommentError, ctx, error);
		}
	}

	// 修改评论
	async updateComment(ctx: Context) {
		try {
			const id = ctx.params.id;
			const comment = ctx.request.body;
			const res = await commentService.modifyComment(comment, id);
			if (res) {
				ctx.body = new Result(200, '修改评论成功', 'success');
			} else {
				ctx.app.emit('error', ERROR.updateCommentError, ctx);
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updateCommentError, ctx, error);
		}
	}

	async dianzanComment(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const userId = ctx.state.user.id;
			const res = await commentDianzanService.dianzan(id, userId);
			if (res) {
				ctx.body = new Result<string>(200, '点赞成功', 'success');
			} else {
				throw new Error('点赞失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.dianzanCommentError, ctx, error);
		}
	}

	async cancelDianzanComment(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const userId = ctx.state.user.id;
			const res = await commentDianzanService.cancelDianzan(id, userId);
			if (res) {
				ctx.body = new Result<string>(200, '取消点赞成功', 'success');
			} else {
				throw new Error('取消点赞失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.cancelDianzanCommentError, ctx, error);
		}
	}

	async getDianzanList(ctx: Context) {
		try {
			const userId = ctx.state.user.id;
			const res = await commentDianzanService.getUserDianzanIdList(
				userId
			);
			if (res) {
				ctx.body = new Result<number[]>(200, '获取评论成功', res);
			} else {
				throw new Error('获取评论失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.getCommentListError, ctx, error);
		}
	}
}

export default CommentController;
