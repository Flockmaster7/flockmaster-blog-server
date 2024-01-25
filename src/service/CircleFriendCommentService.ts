import CircleFriendComment from '../model/CircleFriendComment';

export default interface CircleFriendImageService {
	addCircleFriendComment(
		circleFriendComment: CircleFriendComment
	): Promise<boolean>;

	updateCircleFriendComment(
		circleFriendComment: Partial<CircleFriendComment>
	): Promise<boolean>;

	removeCircleFriendComment(id: number): Promise<boolean>;
}
