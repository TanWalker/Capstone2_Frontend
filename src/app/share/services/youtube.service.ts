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
    return this.http.post(`${environment.urls.api}/getLinkTechniqueByStyleId`, {
      style_id
    });
  }
  getLinkNutrition() {
    return this.http.get(`${environment.urls.api}/getLinkNutrition`);
  }
  uploadLinkByStyleId(link, style_id) {
    return this.http.post(
      `${environment.urls.api}/uploadLinkTechniqueByStyleId`,
      {
        link: link,
        style_id: style_id
      }
    );
  }
  uploadLinkNutrition(link) {
    return this.http.post(`${environment.urls.api}/uploadLinkNutrition`, {
      link: link
    });
  }
  getNewLink() {
    return this.http.get(`${environment.urls.api}/getNewLinkTechnique`);
  }
  deleteLink(link_id: String) {
    return this.http.delete(
      `${environment.urls.api}` + `/deleteLinkTechnique/${link_id}`
    );
  }
  deleteLinkNutrition(link_id: String) {
    return this.http.delete(
      `${environment.urls.api}` + `/deleteLinkNutrition/${link_id}`
    );
  }
}
