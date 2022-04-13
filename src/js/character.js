import Inventory from "./inventory.js";

export default class Character {
  constructor(name, charClass) {
    this.name = name;
    this.charClass = charClass;
    this.hp = this.charClass.str + 5;
    this.gold = 10;
    this.inventory = new Inventory(5);
    this.equipment = [];
  }

  LevelUp() {
    this.charClass.LevelUp();
    this.hp = this.charClass.str + 5;
  }

  EquipItem(item) {
    if (this.equipment.length >= 2) {
      return "Cannot equip";
    } else {
      const invItem = this.inventory.RemoveItem(item);
      if (invItem) {
        this.equipment.push(invItem);
        this.charClass.AddItem(invItem);
        this.hp = this.charClass.str + 5;
        return "Success";
      } else {
        return "No item in inventory";
      }
    }
  }

  RemoveItem(item) {
    if (this.equipment.includes(item) && !this.inventory.IsFull()) {
      this.charClass.RemoveItem(item);
      this.hp = this.charClass.str + 5;
      let index = this.equipment.findIndex(eqItem => eqItem.name === item.name);
      this.inventory.AddItem(this.equipment.splice(index, 1)[0]);
      return true;
    } else {
      return false;
    }
  }
}