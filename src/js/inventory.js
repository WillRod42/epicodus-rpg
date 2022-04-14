export default class Inventory {
  constructor(size) {
    this.items = [];
    this.size = size;
  }

  AddItem(item) {
    if (this.items.length < this.size) {
      this.items.push(item);
      return true;
    } else {
      return false;
    }
  }

  RemoveItem(targetItem) {
    let index = this.items.findIndex(item => item.ToString() === targetItem);
    if (index != -1) {
      return this.items.splice(index, 1)[0];
    } else {
      return null;
    }
  }

  GetInventory() {
    if (this.items.length === 0) {
      return "empty";
    }

    let inventory = "";
    this.items.forEach((item) => {
      inventory += item.name + ", ";
    });

    return inventory.slice(0, inventory.length - 2);
  }

  IsFull() {
    return this.items.length >= this.size;
  }
}