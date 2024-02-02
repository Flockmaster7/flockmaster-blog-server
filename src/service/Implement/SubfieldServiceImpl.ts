import Subfield from '../../model/Subfield';
import { PageType } from '../../types';
import SubfieldService from '../SubfieldService';
import sequelize from '../../db/mysql';

export default class SubfieldServiceImpl implements SubfieldService {
	async getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Subfield>
	): Promise<PageType<Subfield>> {
		const { rows } = await Subfield.findAndCountAll({
			where: wrapper,
			attributes: [
				'id',
				'name',
				[
					sequelize.literal(
						'(SELECT COUNT(*) FROM blog WHERE blog.classify = Subfield.id)'
					),
					'blogCount'
				],
				'createdAt'
			],
			offset: (pageNum - 1) * pageSize,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: rows.length,
			rows
		};
	}

	async getDetail(id: number): Promise<Subfield | null> {
		const subfield = await Subfield.findOne({
			where: {
				id
			},
			attributes: {
				exclude: ['isDeleted']
			}
		});
		return subfield;
	}

	async addSubfield(subfield: Subfield): Promise<boolean> {
		const sfield = await Subfield.create(subfield);
		return sfield ? true : false;
	}

	// 删除评论
	async removeSubfield(id: number): Promise<boolean> {
		const res = await Subfield.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	//修改评论
	async updateSubfield(subfield: Partial<Subfield>): Promise<boolean> {
		const res = await Subfield.update(subfield, {
			where: {
				id: subfield.id
			}
		});
		return res[0] > 0 ? true : false;
	}
}
