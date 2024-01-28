import Subfield from '../model/Subfield';
import { PageType } from '../types';

export default interface SubfieldService {
	getList(
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Subfield>
	): Promise<PageType<Subfield>>;

	getDetail(id: number): Promise<Subfield | null>;

	addSubfield(subfield: Subfield): Promise<boolean>;

	updateSubfield(subfield: Partial<Subfield>): Promise<boolean>;

	removeSubfield(id: number): Promise<boolean>;
}
