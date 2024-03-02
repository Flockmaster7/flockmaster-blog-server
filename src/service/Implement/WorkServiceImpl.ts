import { Op } from 'sequelize';
import Work from '../../model/Work';
import { WorkType } from '../../types/work';
import WorkService from '../WorkService';

class WorkServiceImpl implements WorkService {
	// 添加作品
	async addWork(work: WorkType) {
		const res = await Work.create(work as Work, {
			fields: ['work_title', 'work_image', 'work_des', 'work_url']
		});
		return res.dataValues;
	}

	// 修改作品
	async modifyWork(id: number, work: WorkType) {
		const wrapper = { id };
		const res = await Work.update(work, { where: wrapper });
		return res[0] > 0 ? true : false;
	}

	// 获取作品详情
	async getDetail(id: number) {
		const wrapper = { id };
		const res = await Work.findOne({
			where: wrapper,
			attributes: [
				'id',
				'work_title',
				'work_image',
				'work_des',
				'work_url',
				'createdAt',
				'updatedAt'
			]
		});
		return res ? res.dataValues : null;
	}

	// 获取作品列表
	async getList(pageNum: number, pageSize: number, wrapper: Partial<Work>) {
		let filter = {};
		if (wrapper) {
			wrapper.work_title &&
				Object.assign(filter, {
					work_title: { [Op.like]: `%${wrapper?.work_title}%` }
				});
			wrapper.work_des &&
				Object.assign(filter, {
					work_des: { [Op.like]: `%${wrapper?.work_des}%` }
				});
		}
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await Work.findAndCountAll({
			where: filter,
			offset,
			limit: pageSize,
			attributes: [
				'id',
				'work_title',
				'work_image',
				'work_des',
				'work_url',
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

	// 删除作品
	async deleteWork(id: number) {
		const wrapper = { id };
		const res = await Work.destroy({ where: wrapper });
		return res > 0 ? true : false;
	}

	async getWorkCount() {
		const res = await Work.count();
		return res;
	}
}

export default WorkServiceImpl;
