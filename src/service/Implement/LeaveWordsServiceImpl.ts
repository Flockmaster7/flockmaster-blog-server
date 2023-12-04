import LeaveWords from '../../model/LeaveWords';
import User from '../../model/User';
import LeaveWordsService from '../LeaveWordsService';

class LeaveWordsServiceImpl implements LeaveWordsService {
	// 发布评论
	async createLeaveWords(wrapper: any) {
		const res = await LeaveWords.create(wrapper as LeaveWords);
		if (wrapper.parent_id) {
			const parentLeaveWords = await LeaveWords.findOne({
				where: {
					id: wrapper.parent_id
				}
			});
			console.log(parentLeaveWords);
			parentLeaveWords?.$add('children', res);
		}
		return res.dataValues;
	}

	// 获取留言列表
	async getLeaveWords(pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await LeaveWords.findAndCountAll({
			where: {
				parent_id: null
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				},
				{
					model: LeaveWords,
					as: 'children',
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['id', 'name', 'user_image']
						},
						{
							model: LeaveWords,
							as: 'targetLeaveWords',
							include: [
								{
									model: User,
									as: 'user',
									attributes: ['id', 'name', 'user_image']
								}
							]
						}
					],
					limit: 3,
					order: [['createdAt', 'DESC']]
				}
			],
			limit: pageSize * 1,
			offset: offset,
			order: [['createdAt', 'DESC']]
		});
		// 查询评论总数
		const total = await LeaveWords.count();
		return {
			pageNum,
			pageSize,
			total,
			count,
			rows: rows
		};
	}

	// 获取子留言
	async getChildLeaveWords(
		parent_id: number,
		pageNum: number,
		pageSize: number
	) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await LeaveWords.findAndCountAll({
			where: {
				parent_id: parent_id
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				},
				{
					model: LeaveWords,
					as: 'targetLeaveWords',
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['id', 'name', 'user_image']
						}
					]
				}
			],
			limit: pageSize * 1,
			offset: offset,
			order: [['createdAt', 'DESC']]
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows: rows
		};
	}

	// 删除评论
	async deleteLeaveWords(id: number) {
		const res = await LeaveWords.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	//修改留言
	async modifyLeaveWords(leaveWords: LeaveWords, id: number) {
		const res = await LeaveWords.update(leaveWords, {
			where: {
				id
			}
		});
		return res[0] > 0 ? true : false;
	}

	async getLeaveWordCount() {
		const res = await LeaveWords.count();
		return res;
	}
}

export default LeaveWordsServiceImpl;
