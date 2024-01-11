import CircleFriendVideo from '../model/CircleFriendVideo';

export default interface CircleFriendImageService {
	addVideo(circleFriendVideos: CircleFriendVideo[]): Promise<boolean>;

	removeVideoByCircleFriendId(id: number): Promise<boolean>;

	findVideoByCircleFriendId(id: number): Promise<boolean>;
}
