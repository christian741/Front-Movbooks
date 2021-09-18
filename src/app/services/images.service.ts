import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url = `${ environment.host }/images`;

  constructor(private http: HttpClient) { }

  upload(image: File, folder: 'Profiles'): Observable<any> {
    const formData = new FormData();
    formData.append('my-image', image);
    return this.http.post(`${ this.url }/uploadImage?folder=${ folder }`, formData);
  }

  delete(filename: string, folder: 'Profiles'): Observable<any> {
    return this.http.delete<any>(`${ this.url }/deleteImage?filename=${ filename }&folder=${ folder }`);
  }
}
