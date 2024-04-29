import { Op } from 'sequelize';
import Message from '../../model/Message';
import { PageType } from '../../types';
import MessageService from '../MessageService';

class MessageServiceImpl implements MessageService {
	async getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Message>
	): Promise<PageType<Message>> {
		let filter = {};
		if (wrapper) {
			wrapper.content &&
				Object.assign(filter, {
					content: { [Op.like]: `%${wrapper?.content}%` }
				});
		}
		const { rows, count } = await Message.findAndCountAll({
			where: filter,
			attributes: ['id', 'content', 'createdAt', 'updatedAt'],
			offset: (pageNum - 1) * pageSize,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	async getDetail(id: number): Promise<Message | null> {
		const message = await Message.findOne({
			where: {
				id
			},
			attributes: {
				exclude: ['isDeleted']
			}
		});
		return message;
	}

	async addMessage(message: Message): Promise<boolean> {
		const smessage = await Message.create(message);
		return smessage ? true : false;
	}

	async removeMessage(id: number): Promise<boolean> {
		const res = await Message.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	async updateMessage(message: Partial<Message>): Promise<boolean> {
		const smessage = await Message.findOne({
			where: { id: message.id }
		});
		if (!smessage) return false;
		const res = await Message.update(message, {
			where: {
				id: message.id
			}
		});
		return res[0] > 0 ? true : false;
	}
}

export default MessageServiceImpl;
