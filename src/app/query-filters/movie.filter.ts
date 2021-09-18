import { BaseFilter } from './base.filter';

export class MovieFilter extends BaseFilter {
    title?: string;
    aggregated: boolean;
}
