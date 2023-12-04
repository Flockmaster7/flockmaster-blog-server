import { Op } from 'sequelize';
import User from '../model/User';
import User_Follow from '../model/User_Follow';
import { GetUserInfoParamsType, UpdateUserInfoParamsType } from '../types/user';
import User_FocusService from './user_focusService';
import { uid } from 'uid';
import Tag from '../model/Tag';
import Blog from '../model/Blog';
import Work from '../model/Work';

const user_focusService = new User_FocusService();
class UserService {
	// 添加用户
	async createUser(user_name: string, password: string): Promise<User> {
		const id = uid();
		const name = '用户' + id;
		const description = '用户有点懒，什么都没留下';
		const user_image =
			'/flockmaster-blogs/images/b7a10b5f3c91973d716b5ee07.png';
		const res = await User.create(
			{
				user_name,
				password,
				name,
				description,
				user_image
			} as User,
			{
				fields: [
					'user_name',
					'password',
					'name',
					'description',
					'user_image'
				]
			}
		);
		return res.dataValues;
	}

	// 获取用户信息
	async getUserInfo({
		id,
		user_name,
		password,
		is_admin,
		name,
		description
	}: GetUserInfoParamsType) {
		const wrapper = {};
		id && Object.assign(wrapper, { id });
		user_name && Object.assign(wrapper, { user_name });
		password && Object.assign(wrapper, { password });
		is_admin && Object.assign(wrapper, { is_admin });
		name && Object.assign(wrapper, { name });
		description && Object.assign(wrapper, { description });
		const res = await User.findOne({
			attributes: [
				'id',
				'user_name',
				'password',
				'is_admin',
				'name',
				'user_image',
				'description',
				'user_focus',
				'user_fans'
			],
			where: wrapper
		});
		return res ? res.dataValues : null;
	}

	// 更新用户信息
	async updateUser(userInfo: UpdateUserInfoParamsType) {
		const wrapper = { id: userInfo.id };
		const res = await User.update(userInfo, { where: wrapper });
		return res[0] > 0 ? true : false;
	}

	// 删除用户
	async deleteUser(id: number) {
		const wrapper = { id };
		const res = await User.destroy({ where: wrapper });
		return res > 0 ? true : false;
	}

	//关注用户
	async followUser(id: number, user: User) {
		const user1 = await User.findByPk(id);
		const user2 = await User.findByPk(user.id);
		// 更新粉丝量
		const res1 = await User.update(
			{ user_fans: user1?.dataValues.user_fans! + 1 },
			{ where: { id } }
		);
		// 更新关注量
		const res2 = await User.update(
			{ user_focus: user2?.dataValues.user_focus! + 1 },
			{ where: { id: user2?.dataValues.id } }
		);
		if (res1[0] > 0 && res2[0] > 0) {
			// await User_Focus.create({
			// 	focus_id: user1?.id,
			// 	fans_id: user2?.id
			// } as User_Focus);
			await user1?.$add('userFans', user2?.id);
			// await user2?.$add('userFocus', user1?.id);
			return true;
		} else {
			return false;
		}
	}

	// 取消关注
	async unfollowUser(id: number, user: User) {
		const user1 = await User.findByPk(id);
		const user2 = await User.findByPk(user.id);
		// 更新粉丝量
		const res1 = await User.update(
			{ user_fans: user1?.dataValues.user_fans! - 1 },
			{ where: { id } }
		);
		// 更新关注量
		const res2 = await User.update(
			{ user_focus: user2?.dataValues.user_focus! - 1 },
			{ where: { id: user2?.dataValues.id } }
		);
		if (res1[0] > 0 && res2[0] > 0) {
			await user_focusService.deleteUserFollow(user1?.id, user2?.id);
			return true;
		} else {
			return false;
		}
	}

	// 获取用户关注列表
	async getUserFocusList(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		// 先在中间表查出对应的focus_id
		const { count, rows } = await User_Follow.findAndCountAll({
			where: {
				fans_id: id
			},
			order: [['createdAt', 'DESC']],
			offset: offset,
			limit: pageSize
		});
		// 找出对应user的id
		let idList: number[] = [];
		rows.forEach((item) => {
			idList.push(item.dataValues.focus_id);
		});

		const { rows: rows1 } = await User.findAndCountAll({
			where: {
				id: {
					[Op.in]: idList
				}
			},
			attributes: [
				'id',
				'user_name',
				'is_admin',
				'name',
				'user_image',
				'description',
				'user_focus',
				'user_fans'
			]
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows: rows1
		};
	}

	// 获取用户粉丝列表
	async getUserFansList(id: number, pageNum: number, pageSize: number) {
		const offset = (pageNum - 1) * pageSize;
		const { count, rows } = await User_Follow.findAndCountAll({
			where: {
				focus_id: id
			},
			order: [['createdAt', 'DESC']],
			offset: offset,
			limit: pageSize
		});
		// 找出对应user的id
		let idList: number[] = [];
		rows.forEach((item) => {
			idList.push(item.dataValues.focus_id);
		});
		const { rows: rows1 } = await User.findAndCountAll({
			where: {
				id: {
					[Op.in]: idList
				}
			},
			attributes: [
				'id',
				'user_name',
				'is_admin',
				'name',
				'user_image',
				'description',
				'user_focus',
				'user_fans'
			]
		});
		return {
			pageNum,
			pageSize,
			total: count,
			rows: rows1
		};
	}

	// 是否关注
	async isFollowUser(follow_id: number, fans_id: number): Promise<boolean> {
		const isFollow = await user_focusService.isFollow(follow_id, fans_id);
		return isFollow;
	}

	// 获取管理员个人信息
	async adminInfo() {
		const res = await User.findOne({
			where: {
				user_name: 'admin',
				is_admin: 1
			},
			attributes: [
				'id',
				'user_name',
				'is_admin',
				'name',
				'user_image',
				'description',
				'user_focus',
				'user_fans',
				'createdAt'
			]
		});
		if (res) {
			const tagNum = await Tag.count();
			const blogNum = await Blog.count();
			const workNum = await Work.count();
			return {
				...res.dataValues,
				tagNum,
				blogNum,
				workNum
			};
		} else {
			return '未找到管理员信息';
		}
	}

	// 获取用户列表
	async userList() {
		const res = User.findAll({
			attributes: [
				'id',
				'user_name',
				'is_admin',
				'name',
				'user_image',
				'description',
				'user_focus',
				'user_fans',
				'createdAt'
			]
		});
		return res;
	}
}

export default UserService;
