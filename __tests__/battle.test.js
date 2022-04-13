import Monster from "../src/js/monster";
import Character from "../src/js/character";
import Battle from "../src/js/battle";
import Item from "../src/js/item";
import { Warrior } from "../src/js/class";

describe("battle", () => {
  let battle;
  beforeEach(() => {
    battle = new Battle(Monster.CreateMonster(1), new Character("Test", new Warrior()));
  });

  test("It should create an object with the given arguments as properties", () => {
    let monster = new Monster("TestMon", 1, new Warrior(), Item.CreateItem(1));
    let characer = new Character("Test", new Warrior());
    battle = new Battle(monster, characer);

    expect(battle.character).toEqual(characer);
    expect(battle.monster).toEqual(monster);
  });

  test("It should return 'escape' if the player action is escape and reset player health", () => {
    expect(battle.Turn("escape")).toEqual("escape");
    expect(battle.character.hp).toEqual(15);
  });

  test("It should reduce player and monster health by their attacks", () => {
    battle.monster.hp = 100;

    let monsterHealth = battle.monster.hp;
    let characterHealth = battle.character.hp;
    battle.Turn("attack");

    expect(battle.character.hp).toBeLessThan(characterHealth);
    expect(battle.monster.hp).toBeLessThan(monsterHealth);
  });

  test("It should return win and level up the character if the character kills the monster", () => {
    expect(battle.Turn("attack")).toEqual("win");
    expect(battle.character.hp).toEqual(20);
  });

  test("It should return lose if the monster kills the character", () => {
    battle.monster.hp = 100;
    battle.character.hp = 1;

    expect(battle.Turn("attack")).toEqual("lose");
  });

  test("It should give the player the monster drops if the player kills the monster", () => {
    let item = new Item("test", 1, 1, 1, 10);
    let monster = new Monster("TestMon", 1, new Warrior(), [item]);
    battle.monster = monster;

    battle.Turn("attack");
    expect(battle.character.inventory.GetInventory()).toEqual("test");
    expect(battle.character.gold).toBeGreaterThan(10);
  });
});