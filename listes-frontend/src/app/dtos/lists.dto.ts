import { Item, List } from '../models/list.model';

export class CreateListDto {
    title?: string;
    items?: Item[];
}

export class UpdateListDto {
    title?: string;
    items?: Item[];
}
