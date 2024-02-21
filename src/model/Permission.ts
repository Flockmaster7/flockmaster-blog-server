import {
	Model,
	Column,
	Table,
	DataType,
	DeletedAt
} from 'sequelize-typescript';

@Table({ tableName: 'permission' })
export default class Permission extends Model<Permission> {
	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '权限名'
	})
	name!: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '权限行为'
	})
	action!: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;
}
