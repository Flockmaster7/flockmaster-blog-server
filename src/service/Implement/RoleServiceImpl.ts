import { PageType } from '../../types';
import Role from '../../model/Role';
import RoleService from '../RoleService';
import RolePermissionServiceImpl from './RolePermissionServiceImpl';
import Permission from '../../model/Permission';
import { Op } from 'sequelize';

export default class RoleServiceImpl implements RoleService {
	rolePermissionService: RolePermissionServiceImpl =
		new RolePermissionServiceImpl();

	async getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Role>
	): Promise<PageType<Role>> {
		let filter = {};
		if (wrapper) {
			wrapper.name &&
				Object.assign(filter, {
					name: { [Op.like]: `%${wrapper?.name}%` }
				});
		}
		const { rows, count } = await Role.findAndCountAll({
			where: filter,
			attributes: ['id', 'name', 'createdAt', 'updatedAt'],
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

	async getDetail(id: number): Promise<Role | null> {
		const role = await Role.findOne({
			where: {
				id
			},
			include: [
				{
					model: Permission,
					as: 'permissions',
					attributes: ['id', 'name', 'action']
				}
			],
			attributes: {
				exclude: ['isDeleted']
			}
		});
		return role;
	}

	async addRole(role: Role): Promise<boolean> {
		const srole = await Role.create(role);
		await srole.$add('permissions', role.permissions);
		return srole ? true : false;
	}

	async removeRole(id: number): Promise<boolean> {
		await this.rolePermissionService.removeByRoleId(id);
		const res = await Role.destroy({
			where: {
				id
			}
		});
		return res > 0 ? true : false;
	}

	async updateRole(role: Partial<Role>): Promise<boolean> {
		const srole = await Role.findOne({
			where: { id: role.id }
		});
		if (!srole) return false;
		if (role.permissions && role.permissions.length !== 0) {
			await this.rolePermissionService.removeByRoleId(role.id);
			await srole.$add('permissions', role.permissions);
		}
		const res = await Role.update(role, {
			where: {
				id: role.id
			}
		});
		return res[0] > 0 ? true : false;
	}
}
