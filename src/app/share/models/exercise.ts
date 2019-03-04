export class Exercise {
  constructor(
    id: String,
    name: String,
    style_id: String,
    distance: String,
    repetition: String
  ) {
    this.id = id;
    this.name = name;
    this.style_id = style_id;
    this.distance = distance;
    this.repetition = repetition;
  }
  public id: String = '';
  public name: String = '';
  public style_id: String = '';
  public distance: String = '';
  public repetition: String = '';
}
