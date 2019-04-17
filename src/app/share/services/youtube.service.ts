import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  getYoutubeByStyleId(style_id) {
    return this.http.post(`${environment.urls.api}/getYoutubeByStyleId`, {
      style_id
    });
  }
  uploadLinkByStyleId(link, style_id) {
    return this.http.post(`${environment.urls.api}/uploadLinkByStyleId`, {
      link: link,
      style_id: style_id
    });
  }
  getNewLink() {
    return this.http.get(`${environment.urls.api}/getNewLink`);
  }
  deleteLink(link_id: String) {
    return this.http.delete(
      `${environment.urls.api}` + `/deleteLink/${link_id}`
    );
  }
}
