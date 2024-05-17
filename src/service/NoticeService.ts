import Notice from '../model/Notice';
import { PageType } from '../types';

interface NoticeService {
	addNotice(notice: Notice): Promise<boolean>;

	updateNotice(notice: Partial<Notice>): Promise<boolean>;

	removeNotice(id: number): Promise<boolean>;

	getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Notice>
	): Promise<PageType<Notice>>;

	getDetail(id: number): Promise<Notice | null>;

	getNoReadByUserId(userId: number): Promise<number>;
}

export default NoticeService;
