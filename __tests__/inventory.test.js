import Inventory from "../src/js/inventory";
import Item from "../src/js/item";

describe("inventory", () => {
  let inventory;
  beforeEach(() => {
    inventory = new Inventory(5);
  });

  test("It should create a new object with the given size as a property", () => {
    expect(inventory.size).toEqual(5);
  });

  test("It should add the given item if items.length is less than size", () => {
    let item = Item.CreateItem(1);
    inventory.AddItem(item);
    expect(inventory.items[0]).toEqual(item);
  });

  test("It should not add the given item if items.length is less than size", () => {
    let item = Item.CreateItem(1);
    let items = [Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1)];
    items.forEach((fillerItem) => {
      inventory.AddItem(fillerItem);
    });

    expect(inventory.AddItem(item)).toEqual(false);
  });

  test("It should remove and return the given item if it is in items", () => {
    let item = Item.CreateItem(1);
    inventory.AddItem(item);
    expect(inventory.RemoveItem(item.ToString())).toEqual(item);
  });

  test("It should not remove the given item if it is not in items", () => {
    let item = Item.CreateItem(1);
    expect(inventory.RemoveItem(item)).toEqual(null);
  });

  test("It should return a string of all the item names, comma separated, in items", () => {
    let items = [Item.CreateItem(1), Item.CreateItem(1), Item.CreateItem(1)];
    items.forEach((fillerItem) => {
      inventory.AddItem(fillerItem);
    });

    expect(inventory.GetInventory()).toEqual(items[0].name + ", " + items[1].name + ", " + items[2].name);
  });
});