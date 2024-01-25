import CircleFriendComment from '../../model/CircleFriendComment';
import CircleFriendCommentService from '../CircleFriendCommentService';

export default class CircleFriendCommentServiceImpl
	implements CircleFriendCommentService
{
	async addCircleFriendComment(
		circleFriendComment: CircleFriendComment
	): Promise<boolean> {
		const cirFriendComment = await CircleFriendComment.create(
			circleFriendComment
		);
		return cirFriendComment ? true : false;
	}

	// 删除评论
	async removeCircleFriendComment(id: number): Promise<boolean> {
		const res = await CircleFriendComment.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	//修改评论
	async updateCircleFriendComment(
		circleFriendComment: Partial<CircleFriendComment>
	): Promise<boolean> {
		const res = await CircleFriendComment.update(circleFriendComment, {
			where: {
				id: circleFriendComment.id
			}
		});
		return res[0] > 0 ? true : false;
	}
}
