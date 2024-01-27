import CircleFriendComment from '../../model/CircleFriendComment';
import User from '../../model/User';
import { PageType } from '../../types';
import CircleFriendCommentService from '../CircleFriendCommentService';

export default class CircleFriendCommentServiceImpl
	implements CircleFriendCommentService
{
	async getCircleFriendCommentList(
		pageNum: number,
		pageSize: number,
		wrapper: Partial<CircleFriendComment>
	): Promise<PageType<CircleFriendComment>> {
		const { rows } = await CircleFriendComment.findAndCountAll({
			where: wrapper,
			attributes: [
				'id',
				'content',
				'user_id',
				'reply_to',
				'circle_friend_id',
				'createdAt'
			],
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				},
				{
					model: CircleFriendComment,
					as: 'targetComment',
					attributes: ['id', 'user_id'],
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['id', 'name', 'user_image']
						}
					]
				}
			],
			offset: (pageNum - 1) * pageSize,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: rows.length,
			rows
		};
	}

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
