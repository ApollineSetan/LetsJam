import db from "../config/dbConfig.js";

// Constructor
class Demo {
  constructor(id, title, description, image, duration, createdAt, section_id) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.duration = duration;
    this.createdAt = createdAt;
    this.section_id = section_id;
  }

  // Getters and Setters
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }
  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }
  get image() {
    return this._image;
  }
  set image(value) {
    this._image = value;
  }
  get duration() {
    return this._duration;
  }
  set duration(value) {
    this._duration = value;
  }
  get createdAt() {
    return this._createdAt;
  }
  set createdAt(value) {
    this._createdAt = value;
  }
  get section_id() {
    return this._section_id;
  }
  set section_id(value) {
    this._section_id = value;
  }
}

export default Demo;