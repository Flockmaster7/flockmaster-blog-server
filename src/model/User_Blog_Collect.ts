import {
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import User from './User';
import Blog from './Blog';

@Table({ tableName: 'user_blog_collect' })
export default class User_Blog_Collect extends Model<User_Blog_Collect> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		comment: '关联id'
	})
	id: number = 1;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '用户id'
	})
	user_id: number;

	@ForeignKey(() => Blog)
	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		comment: '博客id'
	})
	blog_id: number;

	// @DeletedAt
	// @Column({
	// 	type: DataType.DATE,
	// 	comment: '删除时间'
	// })
	// isDeleted: Date | null;
}
