import {
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import Tag from './Tag';
import Blog_Tag from './Blog_Tag';
import { BelongsToManyRemoveAssociationMixin } from 'sequelize/types';
import User from './User';
import User_Blog_Like from './User_Blog_Like';
import User_Blog_Collect from './User_Blog_Collect';
import Comment from './Comment';

@Table({ tableName: 'blog' })
export default class Blog extends Model<Blog> {
	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '用户id'
	})
	user_id: number;

	@Column({
		type: DataType.CHAR(64),
		allowNull: true,
		comment: '文章标题'
	})
	title: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '文章作者'
	})
	author: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '文章分类(1: 前端，2：后端)'
	})
	classify: string;

	@Column({
		type: DataType.TEXT,
		allowNull: true,
		comment: '文章内容(html)'
	})
	content_html: string;

	@Column({
		type: DataType.TEXT,
		allowNull: true,
		comment: '文章内容(text)'
	})
	content_text: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '文章封面'
	})
	blog_image: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		defaultValue: 0,
		comment: '文章阅读量'
	})
	blog_read: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		defaultValue: 0,
		comment: '文章点赞量'
	})
	blog_like: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: true,
		defaultValue: 0,
		comment: '文章收藏量'
	})
	blog_collect: number;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	articleCount?: number;

	@HasMany(() => Comment)
	comments: Comment[];

	@BelongsTo(() => User)
	user: User;

	@BelongsToMany(() => Tag, () => Blog_Tag)
	tags: Tag[];

	@BelongsToMany(() => User, () => User_Blog_Like)
	likedUsers: User[];

	@BelongsToMany(() => User, () => User_Blog_Collect)
	collectedUsers: User[];

	public $removeAssociation: <R extends Model>(
		propertyKey: string,
		instances: R | R[] | string[] | string | number[] | number,
		options?: any
	) => Promise<any>;
	//
}
