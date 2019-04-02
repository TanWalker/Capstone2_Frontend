import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Class } from '../models/class';
import { Team } from '../models/team';
import { Member } from '../models/member';

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
  removeTeamMember(member: Member) {
    return this.http.post(`${environment.urls.api}` + `/removeTeamMember`,  member);
  }
  getTeamByID(id: String) {
    return this.http.get(`${environment.urls.api}` + `/getTeamByID/${id}`);
  }
  addTeamMember(team_id: String, user_id: String) {
    return this.http.put(`${environment.urls.api}` + `/addTeamMember/`, { team_id , user_id });

  }
}
