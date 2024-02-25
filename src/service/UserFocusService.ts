interface UserFocusService {
	deleteUserFollow(focus_id: number, fans_id: number): Promise<boolean>;

	isFollow(focus_id: number, fans_id: number): Promise<boolean>;
}

export default UserFocusService;
