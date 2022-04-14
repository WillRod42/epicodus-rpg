export class Class {
  constructor(str, dex, int) {
    this.str = str;
    this.dex = dex;
    this.int = int;
  }

  Attack() {
    if (Math.floor(Math.random() * 100) < this.dex) {
      return this.str * 2;
    } else {
      return this.str;
    }
  }

  SufferDamage(damage) {
    return damage;
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

  SufferDamage(damage) {
    let armor = Math.floor(this.str / 2);
    if (armor > damage) {
      return 0;
    }
    return damage - armor;
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
    this.maxMana = this.int;
    this.mana = this.maxMana;
    this.manaRecharge = 5;
  }

  Attack() {
    let damage = this.int;
    if (Math.floor(Math.random() * 100) < this.dex) {
      damage *= 2;
    }

    if (this.mana > 0) {
      damage += this.int * 0.5;
      this.mana--;
    } else if (this.manaRecharge <= 0) {
      this.mana = this.maxMana;
      this.manaRecharge = 5;
    } else {
      this.manaRecharge--;
    }

    return damage;
  }

  SufferDamage(damage) {
    let modifiedDamage = damage;
    if (damage <= this.mana) {
      this.mana -= damage;
      return 0;
    } else {
      modifiedDamage -= this.mana;
      this.mana = 0;
      return modifiedDamage;
    }
  }

  LevelUp() {
    this.str++;
    this.dex += 2;
    this.int += 5;

    this.maxMana = this.int;
  }
}

export class Assassin extends Class {
  constructor() {
    super(4, 10, 1);
  }

  SufferDamage(damage) {
    if ((Math.floor(Math.random() * 100) + 2) < this.dex) {
      return 0;
    } else {
      return damage;
    }
  }

  LevelUp() {
    this.str += 2;
    this.dex += 5;
    this.int++;
  }
}

export class MonsterClass extends Class {
  constructor() {
    super(5, 2, 0);
  }

  LevelUp() {
    this.str += 5;
    this.dex += 3;
  }
}