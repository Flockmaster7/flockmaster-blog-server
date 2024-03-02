import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import RoleServiceImpl from '../service/Implement/RoleServiceImpl';
import Role from '../model/Role';

const roleService = new RoleServiceImpl();

class RoleController {
	async getRoleList(ctx: Context) {
		try {
			const wrapper = ctx.request?.body?.wrapper;
			const res = await roleService.getList(
				Number(ctx.params.pageNum),
				Number(ctx.params.pageSize),
				wrapper
			);
			ctx.body = new Result(200, '获取角色列表成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getRoleListError, ctx, error);
		}
	}

	async getRoleDetail(ctx: Context) {
		try {
			const id = ctx.params.id;
			const res = await roleService.getDetail(Number(id));
			ctx.body = new Result(200, '获取角色详情成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getRoleDetailError, ctx, error);
		}
	}

	async createRole(ctx: Context) {
		try {
			const { name, permissions } = ctx.request.body;
			if (!name)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			const role = new Role();
			role.name = name;
			role.permissions = permissions || [];
			const res = await roleService.addRole(role);
			if (res) {
				ctx.body = new Result<string>(200, '添加角色成功', 'success');
			} else {
				throw new Error('添加角色失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.addRoleError, ctx, error);
		}
	}

	async updateRole(ctx: Context) {
		try {
			const { id, name, permissions } = ctx.request.body;
			if (!id)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			const role = new Role();
			role.id = id;
			name && (role.name = name);
			permissions && (role.permissions = permissions);
			const res = await roleService.updateRole(role);
			if (res) {
				ctx.body = new Result<string>(200, '修改角色成功', 'success');
			} else {
				throw new Error('修改角色失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updateRoleError, ctx, error);
		}
	}

	async removeRole(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const res = await roleService.removeRole(id);
			if (res) {
				ctx.body = new Result<string>(200, '删除角色成功', 'success');
			} else {
				throw new Error('删除角色失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeRoleError, ctx, error);
		}
	}
}

export default RoleController;
