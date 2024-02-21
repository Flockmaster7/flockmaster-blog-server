export default interface RolePermissionService {
	removeByRoleId(id: number): Promise<boolean>;
}
