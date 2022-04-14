import Character from "../src/js/character";
import { Warrior } from "../src/js/class";
import Item from "../src/js/item";
import Shop from "../src/js/shop";

describe("shop", () => {
  let shop;
  let character;
  beforeEach(() => {
    shop = new Shop(5, 1);
    character = new Character("test", new Warrior());
    character.inventory.AddItem(Item.CreateItem(1));
  });

  test("It should create a new object with the given items", () => {
    expect(shop.inventory.items.length).toEqual(5);
  });

  test("It should give the player 80% value gold of given item if it's in their inventory and add it to the shop's inventory", () => {
    let item = character.inventory.items[0];
    shop.SellItem(character, item.ToString());
    expect(shop.inventory.items.includes(item)).toEqual(true);
    expect(character.inventory.items.length).toEqual(0);
    expect(character.gold).toEqual(18);
  });

  test("It should not sell the item if the item is not in the player's inventory", () => {
    let item = Item.CreateItem(2);
    expect(shop.SellItem(character, item)).toEqual(false);
  });

  test("It should add the item to the player's inventory if their inventory is not full and they have enough gold", () => {
    character.gold = 100;
    let shopItem = shop.inventory.items[0];
    expect(shop.BuyItem(character, shopItem.ToString())).toEqual(true);
    expect(character.inventory.items.includes(shopItem)).toEqual(true);
    expect(shop.inventory.items.includes(shopItem)).toEqual(false);
  });

  test("It should not add the item to the player's inventory if their inventory is full", () => {
    let shopItem = shop.inventory.items[0];
    let items = [Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1)];
    items.forEach((fillerItem) => {
      character.inventory.AddItem(fillerItem);
    });

    expect(shop.BuyItem(character, shopItem)).toEqual(false);
  });

  test("It should not add the item to the player's inventory if they do not have enough gold", () => {
    let shopItem = shop.inventory.items[0];
    character.gold = 0;

    expect(shop.BuyItem(character, shopItem)).toEqual(false);
  });
});