import RolePermission from '../../model/RolePermission';
import UserRole from '../../model/UserRole';
import UserRoleService from '../UserRoleService';

class UserRoleServiceImpl implements UserRoleService {
	async removeByUserId(id: number): Promise<boolean> {
		const res = await UserRole.destroy({
			where: { userId: id }
		});
		return res > 0 ? true : false;
	}
}

export default UserRoleServiceImpl;
