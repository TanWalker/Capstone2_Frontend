import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

constructor(
  private http: HttpClient,
) { }

getVersionBE() {
  return this.http.get(`${environment.urls.api}` + `/public/backendversion`);
}
getVersionFRe() {
  console.log(environment.VERSION);
}
getAppVersion() {
  return this.http.get(`${environment.urls.api}` + `/public/appVersion`);
}
}
