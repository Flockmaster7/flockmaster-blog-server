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

@Table({ tableName: 'user_follow' })
export default class User_Follow extends Model<User_Follow> {
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
		unique: false,
		allowNull: true,
		comment: '被关注用户id'
	})
	focus_id: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		unique: false,
		allowNull: true,
		comment: '关注用户id'
	})
	fans_id: number;
}
