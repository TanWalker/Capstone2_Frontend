import { User } from "./user";

export class Exercise {
  constructor() {
  }
  public id: String = '';
  public name: String = '';
  public style: String = '';
  public distance: String = '';
  public reps: String = '';
  public type_id: String = '';
  public time: Number = 0 ;
  public description: String = '';
  public user: User;
}
