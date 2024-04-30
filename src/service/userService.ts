import User from '../model/User';
import { GetUserInfoParamsType } from '../types/user';

import { PageType } from '../types';

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
	updateUser(user: Partial<User>): Promise<boolean>;

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
	userList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<User>
	): Promise<PageType<User>>;

	userDetail(id: number): Promise<User | null>;
}

export default UserService;
