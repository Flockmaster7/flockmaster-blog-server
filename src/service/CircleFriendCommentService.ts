import CircleFriendComment from '../model/CircleFriendComment';
import { PageType } from '../types';

export default interface CircleFriendImageService {
	getCircleFriendCommentList(
		pageNum: number,
		pageSize: number,
		wrapper: Partial<CircleFriendComment>
	): Promise<PageType<CircleFriendComment>>;

	addCircleFriendComment(
		circleFriendComment: CircleFriendComment
	): Promise<boolean>;

	updateCircleFriendComment(
		circleFriendComment: Partial<CircleFriendComment>
	): Promise<boolean>;

	removeCircleFriendComment(id: number): Promise<boolean>;
}
