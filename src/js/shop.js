import Item from "./item";
import Inventory from "./inventory";

export default class Shop {
  constructor(numItems, level) {
    let items = [];
    for (let i = 0; i < numItems; i++) {
      items.push(Item.CreateItem(level));
    }

    this.inventory = new Inventory(10);
    this.inventory.items = items;
  }

  SellItem(character, item) {
    const invItem = character.inventory.RemoveItem(item);
    if (invItem) {
      this.inventory.AddItem(invItem);
      character.gold += Math.floor(invItem.value * .8);
      return true;
    } else {
      return false;
    }
  }

  BuyItem(character, item) {
    if (character.inventory.IsFull() || character.gold < Math.floor(item.value * 1.5)) {
      return false;
    } else {
      character.inventory.AddItem(item);
      character.gold -= Math.floor(item.value * 1.5);
      this.inventory.RemoveItem(item);
      return true;
    }
  }
}