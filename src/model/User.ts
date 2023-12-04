import {
	Model,
	Column,
	Table,
	DataType,
	DeletedAt,
	BelongsToMany,
	HasMany
} from 'sequelize-typescript';
import User_Blog_Like from './User_Blog_Like';
import Blog from './Blog';
import User_Blog_Collect from './User_Blog_Collect';
import User_Follow from './User_Follow';

@Table({ tableName: 'user' })
export default class User extends Model<User> {
	@Column({
		type: DataType.STRING,
		comment: '用户账号',
		unique: true,
		allowNull: false
	})
	user_name: string;

	@Column({
		type: DataType.CHAR(64),
		comment: '用户密码',
		allowNull: false
	})
	password: string;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: 0,
		comment: '是否为管理员, 0不是, 1是'
	})
	is_admin: number;

	@Column({
		type: DataType.STRING,
		comment: '用户名',
		allowNull: true
	})
	name: string;

	@Column({
		type: DataType.CHAR(255),
		comment: '用户签名',
		allowNull: true
	})
	description: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		defaultValue: 0,
		comment: '关注量'
	})
	user_focus: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		defaultValue: 0,
		comment: '粉丝量'
	})
	user_fans: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '用户头像'
	})
	user_image: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	@HasMany(() => Blog)
	blogs: Blog[];

	@BelongsToMany(() => Blog, () => User_Blog_Like)
	likedBlogs: Blog[];

	@BelongsToMany(() => Blog, () => User_Blog_Collect)
	collectedBlogs: Blog[];

	@BelongsToMany(() => User, () => User_Follow, 'fans_id', 'focus_id')
	userFocus: User[];

	@BelongsToMany(() => User, () => User_Follow, 'focus_id', 'fans_id')
	userFans: User[];
}
