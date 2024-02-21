import {
	Model,
	Table,
	ForeignKey,
	Column,
	DataType
} from 'sequelize-typescript';
import Role from './Role';
import Permission from './Permission';

@Table({ tableName: 'role_permission' })
export default class RolePermission extends Model<RolePermission> {
	@ForeignKey(() => Role)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '角色id',
		field: 'role_id'
	})
	roleId: number;

	@ForeignKey(() => Permission)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '权限id',
		field: 'permission_id'
	})
	permissionId: number;
}
