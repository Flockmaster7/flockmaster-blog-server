import {
	Model,
	Table,
	ForeignKey,
	Column,
	DataType
} from 'sequelize-typescript';
import User from './User';
import Role from './Role';

@Table({ tableName: 'user_role' })
export default class UserRole extends Model<UserRole> {
	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '用户id',
		field: 'user_id'
	})
	userId!: number;

	@ForeignKey(() => Role)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '角色id',
		field: 'role_id'
	})
	roleId!: number;
}
