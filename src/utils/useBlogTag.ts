import BlogService from '../service/blogService';
import TagService from '../service/TagService';
import { TagType } from '../types/tag';

const blogService = new BlogService();
const tagService = new TagService();

// 根据博客id获取对应的tag列表
export const useGetBlogTagById = async (
	id: number
): Promise<TagType[] | undefined> => {
	const tags = await blogService.getBlog_tag(id * 1);
	let idList: number[] = [];
	if (tags) {
		tags.forEach((item) => {
			idList.push(item.dataValues.tag_id);
		});
		const tagData = await tagService.getTagListByIdList(idList);
		return tagData as TagType[] | undefined;
	}
};
