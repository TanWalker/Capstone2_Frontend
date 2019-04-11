import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(private http: HttpClient) {}
  getVideoInfo(id: String) {
    return this.http.get(
      `https://www.youtube.com/oembed?url=${id}&format=json`
    );
  }
}
