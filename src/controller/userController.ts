import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import UserService from '../service/userService';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import processEnv from '../config/config.default';
import User from '../model/User';
import { uploadFile } from '../utils/Cos';

const userService = new UserService();

class UserController {
	// 登录
	async login(ctx: Context) {
		try {
			const { user_name } = ctx.request.body;
			const { password, ...res } = (await userService.getUserInfo({
				user_name
			})) as User;
			ctx.body = new Result(200, '用户登录成功', {
				token: jwt.sign(res, processEnv.JWT_SECRET as string, {
					expiresIn: '1d'
				})
			});
		} catch (error) {
			console.error('用户登录失败', error);
			ctx.app.emit('error', ERROR.userLoginError, ctx);
		}
	}

	// 注册
	async register(ctx: Context) {
		try {
			const { user_name, password: pwd } = ctx.request.body;
			const { password, ...res } = await userService.createUser(
				user_name,
				pwd
			);
			let data = res;
			ctx.body = new Result(200, '用户注册成功', data);
		} catch (error) {
			console.error(error);
			ctx.app.emit('error', ERROR.userRegisterError, ctx);
		}
	}

	// 修改密码
	async updatePassword(ctx: Context) {
		try {
			const { password } = ctx.request.body;
			const id = ctx.state.userInfo.id;
			const res = await userService.updateUser({ id, password });
			if (res) {
				ctx.body = new Result(200, '修改密码成功', 'success');
			} else {
				ctx.body = new Result(10007, '修改密码失败', 'fail');
			}
		} catch (error) {
			console.error('修改密码失败', error);
			ctx.app.emit('error', ERROR.userChangePasswordError, ctx);
		}
	}

	// 获取用户信息
	async getUserInfo(ctx: Context) {
		try {
			let data = {};
			let id = ctx.request.body.id
				? ctx.request.body.id
				: ctx.state.user.id;
			// const id = ctx.state.user.id;
			const res = await userService.getUserInfo({ id });
			if (res) {
				const { password, ...response } = res;
				data = response;
			}
			ctx.body = new Result(200, '获取用户信息成功', data);
		} catch (error) {
			console.error('获取用户信息失败', error);
			ctx.app.emit('error', ERROR.getUserInfoError, ctx);
		}
	}

	// 修改用户信息
	async updateUserInfo(ctx: Context) {
		try {
			const user = ctx.request.body;
			const id = user.id || ctx.state.user.id;
			const userInfo = Object.assign(user, { id });
			const res = await userService.updateUser(userInfo);
			if (res) {
				ctx.body = new Result(200, '修改用户信息成功', 'success');
			} else {
				ctx.body = new Result(10009, '修改用户信息失败', 'fail');
			}
		} catch (error) {
			console.error('修改用户信息失败', error);
			ctx.app.emit('error', ERROR.updateUserInfoError, ctx);
		}
	}

	// 上传头像
	async uploadAvatar(ctx: Context) {
		try {
			const avatar = ctx.state.img;
			// 上传到腾讯云cos
			await uploadFile(avatar.filepath, avatar.newFilename, 'images');
			const res = {
				avatar: `/flockmaster-blogs/images/${avatar.newFilename}`
			};
			ctx.body = new Result(200, '上传头像成功', res);
		} catch (error) {
			ctx.app.emit('error', ERROR.uploadError, ctx, error);
		}
	}

	//删除用户
	async removeUser(ctx: Context) {
		try {
			const { id } = ctx.params;
			const res = await userService.deleteUser(id * 1);
			if (res) {
				ctx.body = new Result(200, '删除用户成功', 'success');
			} else {
				ctx.body = new Result(30010, '删除用户失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeUserError, ctx, error);
		}
	}

	// 关注用户
	async follow(ctx: Context) {
		try {
			const { id } = ctx.params;
			const user = ctx.state.user;
			if (id == user.id) {
				throw 'error';
			}
			const res = await userService.followUser(id * 1, user);
			if (res) {
				ctx.body = new Result(200, '关注用户成功', 'success');
			} else {
				ctx.body = new Result(30010, '关注用户失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.focusUserError, ctx, error);
		}
	}

	// 取消关注用户
	async unfollow(ctx: Context) {
		try {
			const { id } = ctx.params;
			const user = ctx.state.user;
			const res = await userService.unfollowUser(id * 1, user);
			if (res) {
				ctx.body = new Result(200, '取消关注用户成功', 'success');
			} else {
				ctx.body = new Result(30010, '取消关注用户失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.unfocusUserError, ctx, error);
		}
	}

	// 获取关注列表
	async getUserFollowList(ctx: Context) {
		try {
			const { pageNum, pageSize } = ctx.params;
			const { id } = ctx.state.user;
			const data = await userService.getUserFocusList(
				id * 1,
				pageNum * 1,
				pageSize * 1
			);
			ctx.body = new Result(200, '获取关注列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getUserFollowListError, ctx, error);
		}
	}

	// 获取粉丝列表
	async getUserFansList(ctx: Context) {
		try {
			const { pageNum, pageSize } = ctx.params;
			const { id } = ctx.state.user;
			const data = await userService.getUserFansList(
				id * 1,
				pageNum * 1,
				pageSize * 1
			);
			ctx.body = new Result(200, '获取粉丝列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getUserFansListError, ctx, error);
		}
	}

	// 是否关注用户
	async isFollowUser(ctx: Context) {
		try {
			const { id } = ctx.params;
			const fans_id = ctx.state.user.id;
			console.log(id, fans_id);
			const data = await userService.isFollowUser(id * 1, fans_id * 1);
			ctx.body = new Result(200, '获取关注状态成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.isFollowUserError, ctx, error);
		}
	}

	// 获取管理员个人信息
	async getAdminInfo(ctx: Context) {
		try {
			const data = await userService.adminInfo();
			ctx.body = new Result(200, '获取管理员信息成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getAdminInfoError, ctx, error);
		}
	}

	//获取用户列表
	async getUserList(ctx: Context) {
		try {
			const data = await userService.userList();
			ctx.body = new Result(200, '获取用户列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getUserListError, ctx, error);
		}
	}
}

export default UserController;
