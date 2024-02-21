import Permission from '../model/Permission';
import { PageType } from '../types';

interface PermissionService {
	addPermission(permission: Permission): Promise<boolean>;

	updatePermission(permission: Partial<Permission>): Promise<boolean>;

	removePermission(id: number): Promise<boolean>;

	getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Permission>
	): Promise<PageType<Permission>>;

	getDetail(id: number): Promise<Permission | null>;
}

export default PermissionService;
