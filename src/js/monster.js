import Item from "./item";
import { Warrior } from "./class";
import { Assassin } from "./class";
import { Wizard } from "./class";

export default class Monster {
  constructor(name, level, monClass, itemDrops) {
    this.name = name;
    this.monClass = monClass;
    this.itemDrops = itemDrops;
    this.level = level;

    for(let i = 1; i < level; i++) {
      this.monClass.LevelUp();
    }

    this.hp = monClass.str;
  }

  GetDrops() {
    let drops = this.itemDrops.concat([]);
    drops.push(Math.floor(Math.random() * this.level * 10) + (10 * this.level));
    return drops;
  }

  static CreateMonster(level) {
    const numDrops = Math.floor(Math.random() * 4);
    console.log(numDrops);
    let drops = [];
    for (let i = 0; i < numDrops; i++) {
      drops.push(Item.CreateItem(level));
    }

    switch(Math.floor(Math.random() * 3)) {
      case 0: return new Monster(monsterNames[Math.floor(Math.random() * 14)], level, new Warrior(), drops);
      case 1: return new Monster(monsterNames[Math.floor(Math.random() * 14)], level, new Assassin(), drops);
      case 2: return new Monster(monsterNames[Math.floor(Math.random() * 14)], level, new Wizard(), drops);
    }
  }
}

const monsterNames = [
  "Drake",
  "Ooze",
  "Zombie",
  "Skeleton",
  "Demon",
  "Boar",
  "Chimera",
  "Minotaur",
  "Troll",
  "Goblin",
  "Hobgoblin",
  "Ogre",
  "Bear",
  "Harpy"
];