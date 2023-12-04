export interface ErrorReturnType<T> {
	code: string | number;
	message: string;
	result: T;
}
