import CircleFriendImage from '../../model/CircleFriendImage';
import CircleFriendImageService from '../CircleFriendImageService';

class CircleFriendImageServiceImpl implements CircleFriendImageService {
	async findImageByCircleFriendId(id: number): Promise<boolean> {
		const res = await CircleFriendImage.findOne({
			where: { circleFriendId: id }
		});
		return res ? true : false;
	}

	async removeImageByCircleFriendId(id: number): Promise<boolean> {
		const res1 = await this.findImageByCircleFriendId(id);
		if (!res1) return true;
		const res = await CircleFriendImage.destroy({
			where: { circleFriendId: id }
		});
		return res1 || res > 0 ? true : false;
	}

	async addImage(circleFriendImages: CircleFriendImage[]): Promise<boolean> {
		const cirFriendImage = await CircleFriendImage.bulkCreate(
			circleFriendImages
		);
		return cirFriendImage ? true : false;
	}
}

export default CircleFriendImageServiceImpl;
