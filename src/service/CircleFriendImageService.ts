import CircleFriendImage from '../model/CircleFriendImage';

export default interface CircleFriendImageService {
	addImage(circleFriendImages: CircleFriendImage[]): Promise<boolean>;

	removeImageByCircleFriendId(id: number): Promise<boolean>;

	findImageByCircleFriendId(id: number): Promise<boolean>;
}
