import {
	Column,
	DataType,
	DeletedAt,
	Model,
	HasMany,
	Table
} from 'sequelize-typescript';
import Blog from './Blog';

@Table({ tableName: 'subfield' })
export default class Subfield extends Model<Subfield> {
	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '分栏名称'
	})
	name: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '分栏简介'
	})
	description: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	@HasMany(() => Blog)
	blogs: Blog[];
}
