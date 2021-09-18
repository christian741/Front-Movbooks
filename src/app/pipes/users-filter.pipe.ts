import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'usersFilter'
})
export class UsersFilterPipe implements PipeTransform {

  transform(users: User[], filtro: string): User[] {
    return users.filter(x =>
      x.nickname.toLowerCase().includes(filtro.toLowerCase())
        || x.email.toLowerCase().includes(filtro.toLowerCase())
    );
  }

}
