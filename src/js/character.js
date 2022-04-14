import Inventory from "./inventory.js";

export default class Character {
  constructor(name, charClass) {
    this.name = name;
    this.charClass = charClass;
    this.hp = this.charClass.str + 50;
    this.gold = 10;
    this.inventory = new Inventory(5);
    this.equipment = [];
  }

  LevelUp() {
    this.charClass.LevelUp();
    this.hp = this.charClass.str + 50;
  }

  EquipItem(item) {
    if (this.equipment.length >= 2) {
      return "Cannot equip";
    } else {
      const invItem = this.inventory.RemoveItem(item);
      if (invItem) {
        this.equipment.push(invItem);
        this.charClass.AddItem(invItem);
        this.hp = this.charClass.str + 50;
        return "Success";
      } else {
        return "No item in inventory";
      }
    }
  }

  RemoveItem(targetItem) {
    let index = this.equipment.findIndex(item => item.ToString() === targetItem);
    if (index !== -1 && !this.inventory.IsFull()) {
      const equipItem = this.equipment.splice(index, 1)[0];
      this.charClass.RemoveItem(equipItem);
      this.hp = this.charClass.str + 5;
      this.inventory.AddItem(equipItem);
      return true;
    } else {
      return false;
    }
  }
}