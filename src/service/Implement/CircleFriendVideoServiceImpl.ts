import CircleFriendVideo from '../../model/CircleFriendVideo';
import CircleFriendVideoService from '../CircleFriendVideoService';

class CircleFriendVideoServiceImpl implements CircleFriendVideoService {
	async findVideoByCircleFriendId(id: number): Promise<boolean> {
		const res = await CircleFriendVideo.findOne({
			where: { circleFriendId: id }
		});
		return res ? true : false;
	}

	async removeVideoByCircleFriendId(id: number): Promise<boolean> {
		const res1 = await this.findVideoByCircleFriendId(id);
		if (!res1) return true;
		const res = await CircleFriendVideo.destroy({
			where: { circleFriendId: id }
		});
		return res > 0 ? true : false;
	}

	async addVideo(circleFriendVideos: CircleFriendVideo[]): Promise<boolean> {
		const cirFriendVideo = await CircleFriendVideo.bulkCreate(
			circleFriendVideos
		);
		return cirFriendVideo ? true : false;
	}
}

export default CircleFriendVideoServiceImpl;
