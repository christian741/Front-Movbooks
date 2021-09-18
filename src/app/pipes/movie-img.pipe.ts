import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../../environments/environment';

@Pipe({
  name: 'movieImg'
})
export class MovieImgPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {
    if (!img) {
      return './assets/images/no-image-found.png';
    }
    const imgUrl = `${ environment.movieImgUrl }/${ size }/${ img }`;
    return imgUrl;
  }

}
