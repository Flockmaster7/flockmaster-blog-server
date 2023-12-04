import { ResultType } from '../types/index';

class Result<T> implements ResultType<T> {
	code: number;
	message: string;
	data: T;

	constructor(code: number, message: string, data: T) {
		this.data = data;
		this.code = code;
		this.message = message;
	}
}

export default Result;
