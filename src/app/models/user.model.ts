import { Role } from './role.model';

export class User{
    id?: number;
    nickname?: string;
    email?: string;
    password?: string;
    roleId?: number;
    role?: Role;
    avatar?: string;
    image?: string;
    enabled?: boolean;
    registrationDate?: Date;
}





