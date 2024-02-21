import RolePermission from '../../model/RolePermission';
import RolePermissionService from '../RolePermissionService';

class RolePermissionServiceImpl implements RolePermissionService {
	async removeByRoleId(id: number): Promise<boolean> {
		const res = await RolePermission.destroy({
			where: { roleId: id }
		});
		return res > 0 ? true : false;
	}
}

export default RolePermissionServiceImpl;
