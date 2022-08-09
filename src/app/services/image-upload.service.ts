import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  viewImage(image: string) {
    return this.http.get('api/get/image/info/' + image);
  }
}
