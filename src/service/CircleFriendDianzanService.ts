export default interface CircleFriendDianzanService {
	getUserDianzanIdList(userId: number): Promise<number[]>;

	dianzan(id: number, userId: number): Promise<boolean>;

	cancelDianzan(id: number, userId: number): Promise<boolean>;
}
