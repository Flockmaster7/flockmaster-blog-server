import { Op } from 'sequelize';
import User from '../model/User';
import User_Follow from '../model/User_Follow';
import { GetUserInfoParamsType, UpdateUserInfoParamsType } from '../types/user';
import User_FocusService from './user_focusService';
import { uid } from 'uid';
import Tag from '../model/Tag';
import Blog from '../model/Blog';
import Work from '../model/Work';
import { PageType } from '../types';

const user_focusService = new User_FocusService();
interface UserService {
	// 添加用户
	createUser(user_name: string, password: string): Promise<User>;

	// 获取用户信息
	getUserInfo({
		id,
		user_name,
		password,
		is_admin,
		name,
		description
	}: GetUserInfoParamsType): Promise<User | null>;

	// 更新用户信息
	updateUser(userInfo: UpdateUserInfoParamsType): Promise<boolean>;

	// 删除用户
	deleteUser(id: number): Promise<boolean>;

	//关注用户
	followUser(id: number, user: User): Promise<boolean>;

	// 取消关注
	unfollowUser(id: number, user: User): Promise<boolean>;

	// 获取用户关注列表
	getUserFocusList(
		id: number,
		pageNum: number,
		pageSize: number
	): Promise<PageType<User>>;

	// 获取用户粉丝列表
	getUserFansList(
		id: number,
		pageNum: number,
		pageSize: number
	): Promise<PageType<User>>;

	// 是否关注
	isFollowUser(follow_id: number, fans_id: number): Promise<boolean>;

	// 获取管理员个人信息
	adminInfo(): Promise<Partial<User> | '未找到管理员信息'>;

	// 获取用户列表
	userList(): Promise<User[]>;
}

export default UserService;
