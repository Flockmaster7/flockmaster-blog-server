import { Context } from 'koa';
import { AddCommentWrapper } from '../types/comment';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import CommentServiceImpl from '../service/Implement/CommentServiceImpl';

const commentService: CommentServiceImpl = new CommentServiceImpl();

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
}

export default CommentController;
