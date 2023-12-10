import CircleFriendDianzan from '../../model/CircleFriendDianzan';
import CircleFriendDianzanService from '../CircleFriendDianzanService';

export default class CircleFriendDianzanServiceImpl
	implements CircleFriendDianzanService
{
	async cancelDianzan(id: number, userId: number): Promise<boolean> {
		const res = await CircleFriendDianzan.destroy({
			where: { circleFriendId: id, userId }
		});
		return res > 0 ? true : false;
	}

	async dianzan(id: number, userId: number): Promise<boolean> {
		const circleFriendDianzan = new CircleFriendDianzan();
		circleFriendDianzan.circleFriendId = id;
		circleFriendDianzan.userId = userId;
		const res = await CircleFriendDianzan.create(circleFriendDianzan);
		return res ? true : false;
	}

	async getUserDianzanIdList(userId: number): Promise<number[]> {
		const res = await CircleFriendDianzan.findAll({
			attributes: ['circleFriendId'],
			where: { userId }
		});
		return res.map((item) => item.dataValues.circleFriendId);
	}
}
