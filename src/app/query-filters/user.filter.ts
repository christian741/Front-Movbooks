import { BaseFilter } from './base.filter';

export class UserFilter extends BaseFilter {
    nickname?: string;
    email?: string;
    role?: number;
    enable?: boolean;
}
