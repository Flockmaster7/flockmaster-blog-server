import CommentDianzan from '../../model/CommentDianzan';
import CommentDianzanService from '../CommentDianzanService';

export default class CommentDianzanServiceImpl
	implements CommentDianzanService
{
	async cancelDianzan(id: number, userId: number): Promise<boolean> {
		const res = await CommentDianzan.destroy({
			where: { commentId: id, userId }
		});
		return res > 0 ? true : false;
	}

	async dianzan(id: number, userId: number): Promise<boolean> {
		const commentDianzan = new CommentDianzan();
		commentDianzan.commentId = id;
		commentDianzan.userId = userId;
		const res = await CommentDianzan.create(commentDianzan);
		return res ? true : false;
	}

	async getUserDianzanIdList(userId: number): Promise<number[]> {
		const res = await CommentDianzan.findAll({
			attributes: ['commentId'],
			where: { userId }
		});
		return res.map((item) => item.dataValues.commentId);
	}
}
