import { Op } from 'sequelize';
import Tag from '../model/Tag';
import { TagType } from '../types/tag';

interface TagService {
	// 添加标签
	addTag(tag: TagType): Promise<Tag>;

	// 修改标签
	modifyTag(id: number, tag: TagType): Promise<boolean>;

	// 删除标签
	deleteTag(id: number): Promise<boolean>;

	// 获取标签列表
	getList(pageNum: number, pageSize: number): any;

	// 获取特定id标签列表
	getTagListByIdList(idList: number[]): Promise<Tag[] | null>;

	getTagsCount(): Promise<number>;
}
export default TagService;
