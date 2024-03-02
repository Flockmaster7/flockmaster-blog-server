import { Op } from 'sequelize';
import LeaveWords from '../../model/LeaveWords';
import User from '../../model/User';
import LeaveWordsService from '../LeaveWordsService';

class LeaveWordsServiceImpl implements LeaveWordsService {
	async dianzan(id: number): Promise<boolean> {
		const leaveWord = await LeaveWords.findOne({
			where: {
				id
			}
		});
		if (leaveWord) {
			const res = await this.modifyLeaveWords(
				{
					dianzan: leaveWord?.dataValues.dianzan + 1
				},
				id
			);
			return res;
		} else {
			return false;
		}
	}

	async cancelDianzan(id: number): Promise<boolean> {
		const leaveWord = await LeaveWords.findOne({
			where: {
				id
			}
		});
		if (leaveWord && leaveWord.dataValues.dianzan > 0) {
			const res = await LeaveWords.update(
				{ dianzan: leaveWord?.dataValues.dianzan - 1 },
				{
					where: {
						id
					}
				}
			);
			return res[0] > 0 ? true : false;
		} else {
			return false;
		}
	}

	// 发布留言
	async createLeaveWords(wrapper: any) {
		const res = await LeaveWords.create(wrapper as LeaveWords);
		if (wrapper.parent_id) {
			const parentLeaveWords = await LeaveWords.findOne({
				where: {
					id: wrapper.parent_id
				}
			});
			parentLeaveWords?.$add('children', res);
		}
		return res.dataValues;
	}

	// 获取留言列表
	async getLeaveWords(
		pageNum: number,
		pageSize: number,
		wrapper: Partial<LeaveWords>
	) {
		let filter = {};
		if (wrapper) {
			wrapper.content &&
				Object.assign(filter, {
					content: { [Op.like]: `%${wrapper?.content}%` }
				});
		}
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await LeaveWords.findAndCountAll({
			where: {
				parent_id: null,
				...filter
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
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
	async modifyLeaveWords(leaveWords: Partial<LeaveWords>, id: number) {
		const leaveWord = await LeaveWords.findOne({
			where: {
				id
			}
		});
		if (leaveWord) {
			const res = await LeaveWords.update(leaveWords, {
				where: {
					id
				}
			});
			return res[0] > 0 ? true : false;
		} else {
			return false;
		}
	}

	async getLeaveWordCount() {
		const res = await LeaveWords.count();
		return res;
	}
}

export default LeaveWordsServiceImpl;
