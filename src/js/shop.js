import Item from "./item";
import Inventory from "./inventory";

export default class Shop {
  constructor(numItems, level) {
    let items = [];
    for (let i = 0; i < numItems; i++) {
      items.push(Item.CreateItem(level));
    }

    this.inventory = new Inventory(numItems + 5);
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
    let value = item.split(" ");
    value = value[value.length - 1].slice(0, 2);

    if (character.inventory.IsFull() || character.gold < Math.floor(value)) {
      return false;
    } else {
      let boughtItem = this.inventory.RemoveItem(item);
      character.inventory.AddItem(boughtItem);
      character.gold -= Math.floor(boughtItem.value * 1.5);
      return true;
    }
  }
}