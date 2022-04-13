import Item from "../src/js/item.js";
import { Class, Warrior, Wizard, Assassin } from "./../src/js/class.js";

describe("Class", () => {
  let charClass;
  beforeEach(() => {
    charClass = new Class(0, 0, 0);
  });

  test("It should create an object with the given values as properties", () => {
    expect(charClass.str).toEqual(0);
    expect(charClass.dex).toEqual(0);
    expect(charClass.int).toEqual(0);
  });

  test("It should return an attack equal to 1", () => {
    expect(charClass.Attack()).toEqual(1);
  });

  test("It should increase each stat by one when leveling up", () => {
    charClass.LevelUp();
    expect(charClass.str).toEqual(1);
    expect(charClass.dex).toEqual(1);
    expect(charClass.int).toEqual(1);
  });

  test("It should increase stats by the amount in the given item", () => {
    let item = new Item("test", 1, 1, 1, 10);
    charClass.AddItem(item);
    expect(charClass.str).toEqual(1);
    expect(charClass.dex).toEqual(1);
    expect(charClass.int).toEqual(1);
  });

  test("It should decrease stats by the amount in the given item", () => {
    let item = new Item("test", 1, 1, 1, 10);
    charClass = new Class(10, 10, 10);
    charClass.RemoveItem(item);

    expect(charClass.str).toEqual(9);
    expect(charClass.dex).toEqual(9);
    expect(charClass.int).toEqual(9);
  });
});

describe("Warrior", () => {
  let warrior;
  beforeEach(() => {
    warrior = new Warrior();
  });

  test("It should create a new object with warrior stats", () => {
    expect(warrior.str).toEqual(10);
    expect(warrior.dex).toEqual(4);
    expect(warrior.int).toEqual(1);
  });
  
  test("It should return an attack equal to its str stat", () => {
    expect(warrior.str).toEqual(warrior.Attack());
  });

  test("It should increase its stats by warrior levels", () => {
    warrior.LevelUp();
    expect(warrior.str).toEqual(15);
    expect(warrior.dex).toEqual(6);
    expect(warrior.int).toEqual(2);
  });
});

describe("Assassin", () => {
  let assassin;
  beforeEach(() => {
    assassin = new Assassin();
  });

  test("It should create a new object with assassin stats", () => {
    expect(assassin.str).toEqual(4);
    expect(assassin.dex).toEqual(10);
    expect(assassin.int).toEqual(1);
  });
  
  test("It should return an attack equal to its dex stat", () => {
    expect(assassin.dex).toEqual(assassin.Attack());
  });

  test("It should increase its stats by assassin levels", () => {
    assassin.LevelUp();
    expect(assassin.str).toEqual(6);
    expect(assassin.dex).toEqual(15);
    expect(assassin.int).toEqual(2);
  });
});

describe("Wizard", () => {
  let wizard;
  beforeEach(() => {
    wizard = new Wizard();
  });

  test("It should create a new object with wizard stats", () => {
    expect(wizard.str).toEqual(1);
    expect(wizard.dex).toEqual(4);
    expect(wizard.int).toEqual(10);
  });
  
  test("It should return an attack equal to its int stat", () => {
    expect(wizard.int).toEqual(wizard.Attack());
  });

  test("It should increase its stats by wizard levels", () => {
    wizard.LevelUp();
    expect(wizard.str).toEqual(2);
    expect(wizard.dex).toEqual(6);
    expect(wizard.int).toEqual(15);
  });
});