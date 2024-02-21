import {
	Model,
	Column,
	Table,
	DataType,
	DeletedAt,
	BelongsToMany
} from 'sequelize-typescript';
import Permission from './Permission';
import RolePermission from './RolePermission';
import User from './User';
import UserRole from './UserRole';

@Table({ tableName: 'role' })
export default class Role extends Model<Role> {
	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '角色'
	})
	name: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	@BelongsToMany(() => User, () => UserRole)
	users: User[];

	@BelongsToMany(() => Permission, () => RolePermission)
	permissions: Permission[];
}
