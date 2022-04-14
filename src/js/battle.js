export default class Battle {
  constructor(monster, character) {
    this.character = character;
    this.monster = monster;
    this.monsterDamage = 0;
    this.characterDamage = 0;
  }

  Turn(playerAction) {
    if (playerAction === "escape") {
      return this.EndBattle("escape");
    } else {
      if (this.character.charClass.dex > this.monster.monClass.dex) {
        this.characterDamage = this.monster.hp;
        this.monster.hp -= this.monster.monClass.SufferDamage(this.character.charClass.Attack());
        this.characterDamage -= this.monster.hp;
        if (this.monster.hp <= 0) {
          return this.EndBattle("win");
        }
        this.monsterDamage = this.character.hp;
        this.character.hp -= this.character.charClass.SufferDamage(this.monster.monClass.Attack());
        this.monsterDamage -= this.character.hp;
        if (this.character.hp <= 0) {
          return this.EndBattle("lose");
        }
      } else {
        this.monsterDamage = this.character.hp;
        this.character.hp -= this.character.charClass.SufferDamage(this.monster.monClass.Attack());
        this.monsterDamage -= this.character.hp;
        if (this.character.hp <= 0) {
          return this.EndBattle("lose");
        }
        this.characterDamage = this.monster.hp;
        this.monster.hp -= this.monster.monClass.SufferDamage(this.character.charClass.Attack());
        this.characterDamage -= this.monster.hp;
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
      console.log("do something for game-over");
    } else {
      this.character.hp = this.character.charClass.str + 50;
    }

    return result;
  }
}