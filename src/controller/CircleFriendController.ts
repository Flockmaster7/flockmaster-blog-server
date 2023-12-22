import { Context } from 'koa';
import CircleFriendServiceImpl from '../service/Implement/CircleFriendServiceImpl';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import CircleFriend from '../model/CircleFriend';
import CircleFriendDianzanServiceImpl from '../service/Implement/CircleFriendDianzanServiceImpl';

const circleFriendService = new CircleFriendServiceImpl();
const circleFriendDianzanService = new CircleFriendDianzanServiceImpl();

export default class CircleFriendController {
	async getCircleFriendList(ctx: Context) {
		try {
			const wrapper = ctx.request.body;
			const res = await circleFriendService.getList(
				Number(ctx.params.pageNum),
				Number(ctx.params.pageSize),
				wrapper
			);
			ctx.body = new Result(200, '获取朋友圈成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getCircleFriendListError, ctx, error);
		}
	}

	async postCircleFriend(ctx: Context) {
		try {
			const { content, videos, images } = ctx.request.body;
			const circleFriend = new CircleFriend();
			circleFriend.user_id = Number(ctx.state.user.id);
			circleFriend.content = content;
			circleFriend.videos = videos;
			circleFriend.images = images;
			const res = await circleFriendService.addCircleFriend(circleFriend);
			if (res) {
				ctx.body = new Result<string>(200, '发布朋友圈成功', 'success');
			} else {
				throw new Error('发布朋友圈失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.postCircleFriendError, ctx, error);
		}
	}

	async updateCircleFriend(ctx: Context) {
		try {
			const { id, content, videos, images } = ctx.request.body;
			const circleFriend = new CircleFriend();
			circleFriend.id = Number(id);
			circleFriend.content = content;
			circleFriend.videos = videos;
			circleFriend.images = images;
			const res = await circleFriendService.updateCircleFriend(
				circleFriend
			);
			if (res) {
				ctx.body = new Result<string>(200, '修改朋友圈成功', 'success');
			} else {
				throw new Error('修改朋友圈失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updateCircleFriendError, ctx, error);
		}
	}

	async deleteCircleFriend(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const res = await circleFriendService.removeCircleFriend(id);
			if (res) {
				ctx.body = new Result<string>(200, '删除朋友圈成功', 'success');
			} else {
				throw new Error('删除朋友圈失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeCircleFriendError, ctx, error);
		}
	}

	async getDianzanList(ctx: Context) {
		try {
			const userId = ctx.state.user.id;
			const res = await circleFriendDianzanService.getUserDianzanIdList(
				userId
			);
			if (res) {
				ctx.body = new Result<number[]>(200, '获取朋友圈成功', res);
			} else {
				throw new Error('获取朋友圈失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.getCircleFriendListError, ctx, error);
		}
	}

	async dianzanCircleFriend(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const userId = ctx.state.user.id;
			const res = await circleFriendDianzanService.dianzan(id, userId);
			if (res) {
				ctx.body = new Result<string>(200, '点赞成功', 'success');
			} else {
				throw new Error('点赞失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.dianzanCircleFriendError, ctx, error);
		}
	}

	async cancelDianzanCircleFriend(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const userId = ctx.state.user.id;
			const res = await circleFriendDianzanService.cancelDianzan(
				id,
				userId
			);
			if (res) {
				ctx.body = new Result<string>(200, '取消点赞成功', 'success');
			} else {
				throw new Error('取消点赞失败');
			}
		} catch (error) {
			ctx.app.emit(
				'error',
				ERROR.cancelDianzanCircleFriendError,
				ctx,
				error
			);
		}
	}

	async topCircleFriend(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const circleFirend = new CircleFriend();
			circleFirend.id = id;
			circleFirend.top = 1;
			const res = await circleFriendService.updateCircleFriend(
				circleFirend
			);
			if (res) {
				ctx.body = new Result<string>(200, '置顶成功', 'success');
			} else {
				throw new Error('置顶失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.topCircleFriendError, ctx, error);
		}
	}

	async cancelTopCircleFriend(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const circleFirend = new CircleFriend();
			circleFirend.id = id;
			circleFirend.top = 0;
			const res = await circleFriendService.updateCircleFriend(
				circleFirend
			);
			if (res) {
				ctx.body = new Result<string>(200, '取消置顶成功', 'success');
			} else {
				throw new Error('取消置顶失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.cancelTopCircleFriendError, ctx, error);
		}
	}
}
