class Demo {
  constructor(id, title, description, image_url, duration, createdAt, section_id, audio_url) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image_url = image_url;
    this.duration = duration;
    this.createdAt = createdAt;
    this.section_id = section_id;
    this.audio_url = audio_url;
  }

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
  get image_url() {
    return this._image_url;
  }
  set image_url(value) {
    this._image_url = value;
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
  get audio_url() {
    return this._audio_url;
  }
  set audio_url(value) {
    this._audio_url = value;
  }
}

export default Demo;