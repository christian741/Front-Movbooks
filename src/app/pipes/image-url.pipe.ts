import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(filename: string, folder: 'Profiles'): string {
    const url = `${ environment.host }/images/getImage?filename=${ filename }&folder=${ folder }`;
    return url;
  }

}
