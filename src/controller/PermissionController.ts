import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import PermissionServiceImpl from '../service/Implement/PermissionServiceImpl';
import Permission from '../model/Permission';

const permissionService = new PermissionServiceImpl();

class PermissionController {
	async getPermissionList(ctx: Context) {
		try {
			const wrapper = ctx.request.body;
			const res = await permissionService.getList(
				Number(ctx.params.pageNum),
				Number(ctx.params.pageSize),
				wrapper
			);
			ctx.body = new Result(200, '获取权限列表成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getPermissionListError, ctx, error);
		}
	}

	async getPermissionDetail(ctx: Context) {
		try {
			const id = ctx.params.id;
			const res = await permissionService.getDetail(Number(id));
			ctx.body = new Result(200, '获取权限详情成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.getPermissionDetailError, ctx, error);
		}
	}

	async createPermission(ctx: Context) {
		try {
			const { name, action } = ctx.request.body;
			if (!name || !action)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			const permission = new Permission();
			permission.name = name;
			permission.action = action;
			const res = await permissionService.addPermission(permission);
			if (res) {
				ctx.body = new Result<string>(200, '添加权限成功', 'success');
			} else {
				throw new Error('添加权限失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.addRoleError, ctx, error);
		}
	}

	async updatePermission(ctx: Context) {
		try {
			const { id, name, action } = ctx.request.body;
			if (!id)
				return ctx.app.emit('error', ERROR.FormValidatorError, ctx);
			const permission = new Permission();
			permission.id = id;
			name && (permission.name = name);
			action && (permission.action = action);
			const res = await permissionService.updatePermission(permission);
			if (res) {
				ctx.body = new Result<string>(200, '修改权限成功', 'success');
			} else {
				throw new Error('修改权限失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updatePermissionError, ctx, error);
		}
	}

	async removePermission(ctx: Context) {
		try {
			const id = Number(ctx.params.id);
			const res = await permissionService.removePermission(id);
			if (res) {
				ctx.body = new Result<string>(200, '删除权限成功', 'success');
			} else {
				throw new Error('删除权限失败');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removePermissionError, ctx, error);
		}
	}
}

export default PermissionController;
