import { Warrior } from "../src/js/class";
import Item from "../src/js/item";
import Monster from "../src/js/monster";

describe("monster", () => {
  let monster;
  beforeEach(() => {
    monster = new Monster("test", 1, new Warrior(), [new Item("test", 1, 1, 1, 10)]);
  });

  test("It should create an object with the given arguments as properties and the correct hp", () => {
    expect(monster.name).toEqual("test");
    expect(monster.level).toEqual(1);
    expect(monster.monClass).toEqual(new Warrior());
    expect(monster.itemDrops).toEqual([new Item("test", 1, 1, 1, 10)]);
    expect(monster.hp).toEqual(10);
  });

  test("It should return itemDrops with a number of gold appended to the end", () => {
    let drops = monster.GetDrops();
    expect(drops.slice(0, drops.length - 1)).toEqual(monster.itemDrops);
    expect(typeof(drops.slice(drops.length - 1, drops.length)[0])).toEqual("number");
  });
});