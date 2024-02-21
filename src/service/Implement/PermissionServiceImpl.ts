import { PageType } from '../../types';
import PermissionService from '../PermissionService';
import Permission from '../../model/Permission';

export default class PermissionServiceImpl implements PermissionService {
	async getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Permission>
	): Promise<PageType<Permission>> {
		const { rows, count } = await Permission.findAndCountAll({
			where: wrapper,
			attributes: ['id', 'name', 'action', 'createdAt', 'updatedAt'],
			offset: (pageNum - 1) * pageSize,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows
		};
	}

	async getDetail(id: number): Promise<Permission | null> {
		const permission = await Permission.findOne({
			where: {
				id
			},
			attributes: {
				exclude: ['isDeleted']
			}
		});
		return permission;
	}

	async addPermission(permission: Permission): Promise<boolean> {
		const spermission = await Permission.create(permission);
		return spermission ? true : false;
	}

	async removePermission(id: number): Promise<boolean> {
		const res = await Permission.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	async updatePermission(permission: Partial<Permission>): Promise<boolean> {
		const res = await Permission.update(permission, {
			where: {
				id: permission.id
			}
		});
		return res[0] > 0 ? true : false;
	}
}
