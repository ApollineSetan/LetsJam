class Section {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}

export default Section;
