import CircleFriend from '../model/CircleFriend';
import { PageType } from '../types';

interface CircleFriendService {
	getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<CircleFriend>
	): Promise<PageType<CircleFriend>>;

	addCircleFriend(circleFriend: CircleFriend): Promise<boolean>;

	updateCircleFriend(circleFriend: Partial<CircleFriend>): Promise<boolean>;

	removeCircleFriend(id: number): Promise<boolean>;
}

export default CircleFriendService;
