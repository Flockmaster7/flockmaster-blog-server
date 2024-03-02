import LeaveWords from '../model/LeaveWords';
import { PageType } from '../types';

interface LeaveWordsService {
	// 发布评论
	createLeaveWords(wrapper: any): Promise<LeaveWords>;

	// 获取留言列表
	getLeaveWords(
		pageNum: number,
		pageSize: number,
		wrapper: Partial<LeaveWords>
	): Promise<PageType<LeaveWords>>;

	// 获取子留言
	getChildLeaveWords(
		parent_id: number,
		pageNum: number,
		pageSize: number
	): any;

	// 删除评论
	deleteLeaveWords(id: number): Promise<boolean>;

	//修改留言
	modifyLeaveWords(leaveWords: LeaveWords, id: number): Promise<boolean>;

	getLeaveWordCount(): Promise<number>;

	dianzan(id: number): Promise<boolean>;

	cancelDianzan(id: number): Promise<boolean>;
}

export default LeaveWordsService;
