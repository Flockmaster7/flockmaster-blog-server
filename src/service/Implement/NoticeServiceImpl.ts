import Message from '../../model/Message';
import Notice from '../../model/Notice';
import User from '../../model/User';
import { PageType } from '../../types';
import NoticeService from '../NoticeService';

class NoticeServiceImpl implements NoticeService {
	async getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Notice>
	): Promise<PageType<Notice>> {
		let filter = {};
		if (wrapper) {
			wrapper.isRead &&
				Object.assign(filter, {
					isRead: wrapper.isRead
				});
			wrapper.userId &&
				Object.assign(filter, {
					userId: wrapper.userId
				});
		}
		const { rows, count } = await Notice.findAndCountAll({
			where: filter,
			attributes: ['id', 'isRead', 'createdAt', 'updatedAt'],
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'createdAt', 'updatedAt']
				},
				{
					model: Message,
					as: 'message',
					attributes: ['id', 'content', 'createdAt', 'updatedAt']
				}
			],
			offset: (pageNum - 1) * pageSize,
			limit: pageSize,
			order: [
				['isRead', 'ASC'],
				['createdAt', 'DESC']
			]
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	async getDetail(id: number): Promise<Notice | null> {
		const notice = await Notice.findOne({
			where: {
				id
			},
			attributes: {
				exclude: ['isDeleted', 'userId', 'messageId']
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'createdAt', 'updatedAt']
				},
				{
					model: Message,
					as: 'message',
					attributes: ['id', 'content', 'createdAt', 'updatedAt']
				}
			]
		});
		return notice;
	}

	async addNotice(notice: Notice): Promise<boolean> {
		const snotice = await Notice.create(notice);
		return snotice ? true : false;
	}

	async removeNotice(id: number): Promise<boolean> {
		const res = await Notice.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	async updateNotice(notice: Partial<Notice>): Promise<boolean> {
		const snotice = await Notice.findOne({
			where: { id: notice.id }
		});
		if (!snotice) return false;
		const res = await Notice.update(notice, {
			where: {
				id: notice.id
			}
		});
		return res[0] > 0 ? true : false;
	}

	async getNoReadByUserId(userId: number) {
		const count = await Notice.count({
			where: {
				userId,
				isRead: 0
			}
		});
		return count;
	}
}

export default NoticeServiceImpl;
