import Message from '../model/Message';
import { PageType } from '../types';

interface MessageService {
	addMessage(permission: Message): Promise<boolean>;

	updateMessage(permission: Partial<Message>): Promise<boolean>;

	removeMessage(id: number): Promise<boolean>;

	getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Message>
	): Promise<PageType<Message>>;

	getDetail(id: number): Promise<Message | null>;
}

export default MessageService;
