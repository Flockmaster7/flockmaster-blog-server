import Role from '../model/Role';
import { PageType } from '../types';

interface RoleService {
	addRole(role: Role): Promise<boolean>;

	updateRole(role: Partial<Role>): Promise<boolean>;

	removeRole(id: number): Promise<boolean>;

	getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Role>
	): Promise<PageType<Role>>;

	getDetail(id: number): Promise<Role | null>;
}

export default RoleService;
