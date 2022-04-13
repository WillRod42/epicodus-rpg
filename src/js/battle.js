export default class Battle {
  constructor(monster, character) {
    this.character = character;
    this.monster = monster;
  }

  Turn(playerAction) {
    if (playerAction === "escape") {
      return this.EndBattle("escape");
    } else {
      if (this.character.charClass.dex > this.monster.monClass.dex) {
        this.monster.hp -= this.character.charClass.Attack();
        if (this.monster.hp <= 0) {
          return this.EndBattle("win");
        }
        this.character.hp -= this.monster.monClass.Attack();
        if (this.character.hp <= 0) {
          return this.EndBattle("lose");
        }
      } else {
        this.character.hp -= this.monster.monClass.Attack();
        if (this.character.hp <= 0) {
          return this.EndBattle("lose");
        }
        this.monster.hp -= this.character.charClass.Attack();
        if (this.monster.hp <= 0) {
          return this.EndBattle("win");
        }
      }
    }
  }

  EndBattle(result) {
    if (result === "win") {
      this.character.LevelUp();
      let drops = this.monster.GetDrops();
      drops.slice(0, drops.length - 1).forEach((item) => {
        this.character.inventory.AddItem(item);
      });
      
      this.character.gold += drops[drops.length - 1];

    } else if (result === "lose") {
      console.log("do something for game-over")
    } else {
      this.character.hp = this.character.charClass.str + 5;
    }

    return result;
  }
}