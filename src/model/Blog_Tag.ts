import {
	AutoIncrement,
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	Model,
	PrimaryKey,
	Table
} from 'sequelize-typescript';
import Tag from './Tag';
import Blog from './Blog';

@Table({ tableName: 'blog_tag' })
export default class Blog_Tag extends Model<Blog_Tag> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		comment: '关联id'
	})
	id: number = 1;

	@ForeignKey(() => Blog)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '博客id'
	})
	blog_id: number;

	@ForeignKey(() => Tag)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '标签id'
	})
	tag_id: number;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;
}
