import Notice from '../model/Notice';
import { PageType } from '../types';

interface NoticeService {
	addNotice(permission: Notice): Promise<boolean>;

	updateNotice(permission: Partial<Notice>): Promise<boolean>;

	removeNotice(id: number): Promise<boolean>;

	getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Notice>
	): Promise<PageType<Notice>>;

	getDetail(id: number): Promise<Notice | null>;
}

export default NoticeService;
