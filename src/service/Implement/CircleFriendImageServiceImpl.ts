import CircleFriendImage from '../../model/CircleFriendImage';
import CircleFriendImageService from '../CircleFriendImageService';

class CircleFriendImageServiceImpl implements CircleFriendImageService {
	async removeImageByCircleFriendId(id: number): Promise<boolean> {
		const res = await CircleFriendImage.destroy({
			where: { circleFriendId: id }
		});
		return res > 0 ? true : false;
	}

	async addImage(circleFriendImages: CircleFriendImage[]): Promise<boolean> {
		const cirFriendImage = await CircleFriendImage.bulkCreate(
			circleFriendImages
		);
		return cirFriendImage ? true : false;
	}
}

export default CircleFriendImageServiceImpl;
