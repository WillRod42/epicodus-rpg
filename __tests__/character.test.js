import Item from "../src/js/item.js";
import Character from "./../src/js/character.js";
import { Warrior } from "../src/js/class.js";

describe("character", () => {
  let character;
  beforeEach(() => {
    character = new Character("test", new Warrior());
  });
  
  test("It should return a new object with the given properties and correct hp", () => {
    expect(character.name).toEqual("test");
    expect(character.charClass).toEqual(new Warrior());
    expect(character.hp).toEqual(15);
  });

  test("It should increase hp based on level up stats", () => {
    character.LevelUp();
    expect(character.hp).toEqual(20);
  });

  test("It should equip the given item if it's in inventory and there are less than 2 equiped items", () => {
    let item = Item.CreateItem(1);
    character.inventory.AddItem(item);
    expect(character.EquipItem(item)).toEqual("Success");
  });

  test("It should not equip the given item if it's not in inventory and return 'no item in inventory'", () => {
    let item = Item.CreateItem(1);
    expect(character.EquipItem(item)).toEqual("No item in inventory");
  });

  test("It should not equip the given item if there are 2 or more equiped items", () => {
    let items = [Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1)];
    character.inventory.AddItem(items[0]);
    character.inventory.AddItem(items[1]);
    character.inventory.AddItem(items[2]);
    character.EquipItem(items[0]);
    character.EquipItem(items[1]);
    expect(character.EquipItem(items[2])).toEqual("Cannot equip");
  });

  test("It should remove the given item if it is equipped and there is room in the inventory", () => {
    let item = Item.CreateItem(1);
    character.inventory.AddItem(item);
    character.EquipItem(item);
    expect(character.RemoveItem(item)).toEqual(true);
  });

  test("It should not remove the given item if it is not equipped", () => {
    let item = Item.CreateItem(1);
    expect(character.RemoveItem(item)).toEqual(false);
  });

  test("It should not remove the given item if there is no room in the inventory", () => {
    let item = Item.CreateItem(1);
    character.inventory.AddItem(item);
    character.EquipItem(item);

    let items = [Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1)];
    items.forEach((fillerItem) => {
      character.inventory.AddItem(fillerItem);
    });

    expect(character.RemoveItem(item)).toEqual(false);
  });
});