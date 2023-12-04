import { Op } from 'sequelize';
import TagService from '../TagService';
import Tag from '../../model/Tag';
import { TagType } from '../../types/tag';

class TagServiceImpl implements TagService {
	// 添加标签
	async addTag(tag: TagType) {
		const res = await Tag.create(tag as Tag, {
			fields: ['tag_name', 'tag_classify']
		});
		return res.dataValues;
	}

	// 修改标签
	async modifyTag(id: number, tag: TagType) {
		const wrapper = { id };
		const res = await Tag.update(tag, { where: wrapper });
		return res[0] > 0 ? true : false;
	}

	// 删除标签
	async deleteTag(id: number) {
		const wrapper = { id };
		const res = await Tag.destroy({ where: wrapper });
		return res > 0 ? true : false;
	}

	// 获取标签列表
	async getList(pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Tag.findAndCountAll({
			offset,
			limit: pageSize,
			attributes: [
				'id',
				'tag_name',
				'tag_classify',
				'createdAt',
				'updatedAt'
			]
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	// 获取特定id标签列表
	async getTagListByIdList(idList: number[]) {
		const res = await Tag.findAll({
			where: { id: { [Op.or]: idList } },
			attributes: ['id', 'tag_name', 'tag_classify', 'createdAt']
		});
		return res ? res : null;
	}

	async getTagsCount() {
		const res = await Tag.count();
		return res;
	}
}
export default TagServiceImpl;
