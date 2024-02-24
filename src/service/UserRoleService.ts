export default interface UserRoleService {
	removeByUserId(id: number): Promise<boolean>;
}
