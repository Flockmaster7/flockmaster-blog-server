import { Op } from 'sequelize';
import sequelize from '../../db/mysql';
import CircleFriend from '../../model/CircleFriend';
import CircleFriendComment from '../../model/CircleFriendComment';
import CircleFriendImage from '../../model/CircleFriendImage';
import CircleFriendVideo from '../../model/CircleFriendVideo';
import User from '../../model/User';
import { PageType } from '../../types';
import CircleFriendService from '../CircleFriendService';
import CircleFriendVideoService from '../CircleFriendVideoService';
import CircleFriendImageServiceImpl from './CircleFriendImageServiceImpl';
import CircleFriendVideoServiceImpl from './CircleFriendVideoServiceImpl';

class CircleFriendServiceImpl implements CircleFriendService {
	circleFriendImageService: CircleFriendImageServiceImpl =
		new CircleFriendImageServiceImpl();
	circleFriendVideoService: CircleFriendVideoService =
		new CircleFriendVideoServiceImpl();

	async removeCircleFriend(id: number): Promise<boolean> {
		const res1 = await CircleFriend.destroy({
			where: { id: id }
		});
		const res2 =
			await this.circleFriendImageService.removeImageByCircleFriendId(id);
		const res3 =
			await this.circleFriendVideoService.removeVideoByCircleFriendId(id);
		return res1 > 0 && res2 && res3;
	}

	async updateCircleFriend(
		circleFriend: Partial<CircleFriend>
	): Promise<boolean> {
		const res5 = await CircleFriend.update(circleFriend, {
			where: { id: circleFriend.id }
		});
		if (!res5[0]) return false;
		let res1 = true,
			res2 = true,
			res3 = true,
			res4 = true;
		if (circleFriend.images) {
			res1 =
				await this.circleFriendImageService.removeImageByCircleFriendId(
					circleFriend.id
				);
			const circleFriendImages = circleFriend.images.map((item) => {
				const circleFriendImage = new CircleFriendImage();
				circleFriendImage.circleFriendId = circleFriend.id;
				circleFriendImage.imageUrl = item.imageUrl;
				return circleFriendImage;
			});
			res4 = await this.circleFriendImageService.addImage(
				circleFriendImages
			);
		}
		if (circleFriend.videos) {
			res2 =
				await this.circleFriendVideoService.removeVideoByCircleFriendId(
					circleFriend.id
				);
			const circleFriendVideos = circleFriend.videos?.map((item) => {
				const circleFriendVideo = new CircleFriendVideo();
				circleFriendVideo.circleFriendId = circleFriend.id;
				circleFriendVideo.videoUrl = item.videoUrl;
				return circleFriendVideo;
			});
			res3 = await this.circleFriendVideoService.addVideo(
				circleFriendVideos
			);
		}
		return res1 && res2 && res3 && res4;
	}

	async addCircleFriend(circleFriend: CircleFriend): Promise<boolean> {
		const cirFriend = await CircleFriend.create(circleFriend);
		let res1 = true,
			res2 = true;
		if (circleFriend.images) {
			const circleFriendImages = circleFriend.images.map((item) => {
				const circleFriendImage = new CircleFriendImage();
				circleFriendImage.circleFriendId = cirFriend.id;
				circleFriendImage.imageUrl = item.imageUrl;
				return circleFriendImage;
			});
			res2 = await this.circleFriendImageService.addImage(
				circleFriendImages
			);
		}
		if (circleFriend.videos) {
			const circleFriendVideos = circleFriend.videos.map((item) => {
				const circleFriendVideo = new CircleFriendVideo();
				circleFriendVideo.circleFriendId = cirFriend.id;
				circleFriendVideo.videoUrl = item.videoUrl;
				return circleFriendVideo;
			});
			res1 = await this.circleFriendVideoService.addVideo(
				circleFriendVideos
			);
		}
		if (res1 && res2) return true;
		else return false;
	}

	async getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<CircleFriend>
	): Promise<PageType<CircleFriend>> {
		const total = await CircleFriend.count();
		let filter = {};
		if (wrapper) {
			wrapper.content &&
				Object.assign(filter, {
					content: { [Op.like]: `%${wrapper?.content}%` }
				});
		}
		const { rows } = await CircleFriend.findAndCountAll({
			where: filter,
			attributes: {
				exclude: ['isDeleted'],
				include: [
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM circle_friend_dianzan WHERE circle_friend_dianzan.circle_friend_id = CircleFriend.id)'
						),
						'dianzanCount'
					],
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM circle_friend_comment WHERE circle_friend_comment.isDeleted IS NULL AND circle_friend_comment.circle_friend_id = CircleFriend.id)'
						),
						'commentCount'
					]
				]
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				},
				{
					model: CircleFriendImage,
					as: 'images',
					attributes: ['id', 'image_url']
				},
				{
					model: CircleFriendVideo,
					as: 'videos',
					attributes: ['id', 'video_url']
				},
				{
					model: CircleFriendComment,
					as: 'comments',
					attributes: [
						'id',
						'content',
						'user_id',
						'reply_to',
						'circle_friend_id',
						'createdAt'
					],
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['id', 'name', 'user_image']
						},
						{
							model: CircleFriendComment,
							as: 'targetComment',
							attributes: ['id', 'user_id'],
							include: [
								{
									model: User,
									as: 'user',
									attributes: ['id', 'name', 'user_image']
								}
							]
						}
					]
				}
			],
			order: [
				['top', 'DESC'],
				['createdAt', 'DESC']
			],
			offset: (pageNum - 1) * pageSize,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: total,
			rows
		};
	}

	async getDetail(id: number) {
		const res = await CircleFriend.findOne({
			where: { id },
			attributes: {
				exclude: ['isDeleted'],
				include: [
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM circle_friend_dianzan WHERE circle_friend_dianzan.circle_friend_id = CircleFriend.id)'
						),
						'dianzanCount'
					]
				]
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'user_image']
				},
				{
					model: CircleFriendImage,
					as: 'images',
					attributes: ['id', 'image_url']
				},
				{
					model: CircleFriendVideo,
					as: 'videos',
					attributes: ['id', 'video_url']
				}
			]
		});
		return res;
	}
}

export default CircleFriendServiceImpl;
