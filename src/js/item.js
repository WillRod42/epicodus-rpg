export default class Item {
  constructor(name, str, dex, int, value) {
    this.name = name;
    this.str = str;
    this.dex = dex;
    this.int = int;
    this.value = value;
  }

  ToString() {
    return `${this.name}: [str: ${this.str}, dex: ${this.dex}, int: ${this.int}] ${this.value * 1.5}g`;
  }

  static CreateItem(level) {
    let focus = Math.floor(Math.random() * 3);
    let str = 0;
    let dex = 0;
    let int = 0;
    let className = "";

    switch (focus) {
      case 0: 
        str = Math.floor((Math.random() * 5) + level + 3);
        dex = Math.floor((Math.random() * 5) + 1);
        int = Math.floor((Math.random() * 3));
        className += weaponNames.class.warrior[Math.floor(Math.random() * 4)];
        break;
      case 1: 
        str = Math.floor((Math.random() * 5) + 1);
        dex = Math.floor((Math.random() * 5) + level + 3);
        int = Math.floor((Math.random() * 3));
        className += weaponNames.class.assassin[Math.floor(Math.random() * 4)];
        break;
      case 2:
        str = Math.floor((Math.random() * 3));
        dex = Math.floor((Math.random() * 5) + 1);
        int = Math.floor((Math.random() * 5) + level + 3);
        className += weaponNames.class.wizard[Math.floor(Math.random() * 4)];
        break;
    }

    let name = weaponNames.prefix[Math.floor(Math.random() * 9)] + " " + className + " of " + weaponNames.suffix[Math.floor(Math.random() * 8)];


    return new Item(name, str, dex, int, 10 * level);
  }
}

const weaponNames = {
  "class": {
    "wizard": [
      "wand",
      "staff",
      "orb",
      "book"
    ],
    "warrior": [
      "sword",
      "axe",
      "hammer",
      "mace"
    ],
    "assassin": [
      "dagger",
      "rapier",
      "crossbow",
      "bow"
    ]
  },
  "prefix": [
    "glowing",
    "burning",
    "chilling",
    "shocking",
    "big",
    "tiny",
    "sharp",
    "heavy",
    "exquisite"
  ],
  "suffix": [
    "destruction",
    "flames",
    "lightning",
    "ice",
    "chaos",
    "light",
    "justice",
    "slaying"
  ]
};