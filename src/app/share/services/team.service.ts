import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Class } from '../models/class';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) {}
  getAllTeam() {
    return this.http.get(`${environment.urls.api}` + `/getTeam`);
  }
  createTeam(team: Class) {
    return this.http.post(`${environment.urls.api}` + `/addTeam`, team);
  }
  updateTeam(team: Class) {
    return this.http.put(`${environment.urls.api}` + `/updateTeam`, team);
  }
  deleteTeam(id: String) {
    return this.http.delete(`${environment.urls.api}` + `/deleteTeam/${id}`);
  }
  getMemberByTeam(id: String) {
    return this.http.get(`${environment.urls.api}` + `/getMemberByTeam/${id}`);
  }
  getTeamByCoach() {
    return this.http.get(`${environment.urls.api}` + `/getTeamByCoach`);
  }
  removeTeamMember(id: String) {
    return this.http.delete(`${environment.urls.api}` + `/deleteTeam/${id}`);
  }
}
