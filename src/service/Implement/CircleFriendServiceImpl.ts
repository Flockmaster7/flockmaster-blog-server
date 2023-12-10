import sequelize from '../../db/mysql';
import CircleFriend from '../../model/CircleFriend';
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
		await CircleFriend.update(circleFriend, {
			where: { id: circleFriend.id }
		});
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
		const circleFriendImages = circleFriend.images.map((item) => {
			const circleFriendImage = new CircleFriendImage();
			circleFriendImage.circleFriendId = cirFriend.id;
			circleFriendImage.imageUrl = item.imageUrl;
			return circleFriendImage;
		});
		const circleFriendVideos = circleFriend.videos.map((item) => {
			const circleFriendVideo = new CircleFriendVideo();
			circleFriendVideo.circleFriendId = cirFriend.id;
			circleFriendVideo.videoUrl = item.videoUrl;
			return circleFriendVideo;
		});
		const res1 = await this.circleFriendVideoService.addVideo(
			circleFriendVideos
		);
		const res2 = await this.circleFriendImageService.addImage(
			circleFriendImages
		);
		if (res1 && res2) return true;
		else return false;
	}

	async getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<CircleFriend>
	): Promise<PageType<CircleFriend>> {
		const { rows } = await CircleFriend.findAndCountAll({
			where: wrapper,
			attributes: {
				exclude: ['isDeleted'],
				include: [
					[
						sequelize.literal(
							'(SELECT COUNT(*) FROM circle_friend_dianzan WHERE circle_friend_dianzan.circle_friend_id = id)'
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
			],
			order: [['createdAt', 'DESC']],
			offset: (pageNum - 1) * pageSize,
			limit: pageSize
		});
		return {
			pageNum,
			pageSize,
			total: rows.length,
			rows
		};
	}
}

export default CircleFriendServiceImpl;