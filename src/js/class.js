export class Class {
  constructor(str, dex, int) {
    this.str = str;
    this.dex = dex;
    this.int = int;
  }

  Attack() {
    return 1;
  }

  LevelUp() {
    this.str++;
    this.dex++;
    this.int++;
  }

  AddItem(item) {
    this.str += item.str;
    this.dex += item.dex;
    this.int += item.int;
  }

  RemoveItem(item) {
    this.str -= item.str;
    this.dex -= item.dex;
    this.int -= item.int;
  }
}

export class Warrior extends Class {
  constructor() {
    super(10, 4, 1);
  }

  Attack() {
    return this.str;
  }

  LevelUp() {
    this.str += 5;
    this.dex += 2;
    this.int++;
  }
}

export class Wizard extends Class {
  constructor() {
    super(1, 4, 10);
  }

  Attack() {
    return this.int;
  }

  LevelUp() {
    this.str++;
    this.dex += 2;
    this.int += 5;
  }
}

export class Assassin extends Class {
  constructor() {
    super(4, 10, 1);
  }

  Attack() {
    return this.dex;
  }

  LevelUp() {
    this.str += 2;
    this.dex += 5;
    this.int++;
  }
}