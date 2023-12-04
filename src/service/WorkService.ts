import Work from '../model/Work';
import { WorkType } from '../types/work';

interface WorkService {
	// 添加作品
	addWork(work: WorkType): Promise<Work>;
	// 修改作品
	modifyWork(id: number, work: WorkType): Promise<boolean>;

	// 获取作品详情
	getDetail(id: number): Promise<Work | null>;

	// 获取作品列表
	getList(pageNum: number, pageSize: number): any;

	// 删除作品
	deleteWork(id: number): Promise<boolean>;

	getWorkCount(): Promise<number>;
}

export default WorkService;
