import CircleFriendVideo from '../../model/CircleFriendVideo';
import CircleFriendVideoService from '../CircleFriendVideoService';

class CircleFriendVideoServiceImpl implements CircleFriendVideoService {
	async removeVideoByCircleFriendId(id: number): Promise<boolean> {
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
