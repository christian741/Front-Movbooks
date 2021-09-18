import { BaseFilter } from './base.filter';

export class BookFilter extends BaseFilter {
    title?: string;
    aggregated: boolean;
}

