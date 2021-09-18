import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../../environments/environment.prod';

@Pipe({
  name: 'avatarImg'
})
export class AvatarImgPipe implements PipeTransform {

  transform(value: string): string {
    const avatarUrl = `${ environment.host }/avatars/getAvatar?name=${ value }`;
    return avatarUrl;
  }

}
