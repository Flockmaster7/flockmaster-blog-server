import {
	Column,
	DataType,
	DeletedAt,
	Model,
	Table
} from 'sequelize-typescript';

@Table({ tableName: 'work' })
export default class Work extends Model<Work> {
	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '作品标题'
	})
	work_title: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '作品背景图'
	})
	work_image: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '作品描述'
	})
	work_des: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		comment: '作品跳转url'
	})
	work_url: string;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;
}
