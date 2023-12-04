import {
	BelongsTo,
	Column,
	DataType,
	DeletedAt,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';

@Table({ tableName: 'common' })
export default class Common extends Model<Common> {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		comment: '网站访问量'
	})
	website_views: number;

	@DeletedAt
	@Column({
		type: DataType.DATE,
		comment: '删除时间'
	})
	isDeleted: Date | null;

	public getWebsiteViews() {
		return this.website_views;
	}

	public setWebsiteViews(website_views: number) {
		this.website_views = website_views;
	}
}
