import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './assets/images/warrior.png';
import './assets/images/assassin.png';
import './assets/images/wizard.png';
import Character from "./js/character";
import Monster from "./js/monster";
import Battle from "./js/battle";
import Shop from "./js/shop";
import { Assassin, Warrior, Wizard } from "./js/class";

function updateList(listItems, className) {
  let listHTML = "<ul>";
  listItems.forEach((item) =>{
    listHTML += `<li class='${className}'> ${item.ToString()}`;
  });
  return listHTML += "</ul>";
}

function updateBattleUI(battle) {
  $("#character-hp").text(`${battle.character.hp}: -${battle.monsterDamage}`);
  $("#monster-hp").text(`${battle.monster.hp}: -${battle.characterDamage}`);
  $("#name-display").text(battle.character.name);
  $("#monster-name").text(battle.monster.name + " Slime");
}

function toggleBattleUI() {
  $("#shop-screen").toggle();
  $("#battle-screen").toggle();
}

$(document).ready(function() {
  let player;
  let monster;
  let battle;
  let shop;
  let level;
  
  $("#shop-screen").hide();
  $("#game-over").hide();
  $("#battle-screen").hide();

  $("form").on("submit", (e) => {
    e.preventDefault();
    let charClass;
    switch ($("#character-class").val()) {
      case "warrior": charClass = new Warrior(); $("#character-img").attr("src", "./assets/images/warrior.png"); break;
      case "assassin": charClass = new Assassin(); $("#character-img").attr("src", "./assets/images/assassin.png"); break;
      case "wizard": charClass = new Wizard(); $("#character-img").attr("src", "./assets/images/wizard.png"); break;
    }
    player = new Character($("#character-name").val(), charClass);
    monster = Monster.CreateMonster(1)
    level = 1;
    $("#battle-screen").show();
    $("#character-select").hide();
    battle = new Battle(monster, player);
    updateBattleUI(battle);
  });
  
  $("#character-attack").on("click", function(){
    let result = battle.Turn("attack");
    updateBattleUI(battle);
    if (result === "win") {
      level++;
      $("#character-inventory").html(updateList(player.inventory.items, "player-item"));

      shop = new Shop(5, monster.level);
      toggleBattleUI();

      $("#shop-inventory").html(updateList(shop.inventory.items, "shop-item"));
      $("#gold").text(player.gold + "g");

      $(".shop-item").on("click", function() {
        if(shop.BuyItem(player, $(this).text().trim())) {
          $(this).remove();
          $("#gold").text(player.gold + "g");
          $("#character-inventory").html(updateList(player.inventory.items, "player-item"));
        }
      });
      
    }
    else if (result === "lose") {
      $("#game-over").show();
      $("#battle-screen").hide();
      $("#restart").on("click", function() {
        $("#game-over").hide();
        $("#character-select").show();
      });
    }
  });
  $("#sell").on("click", function() {
    $(".player-item").off("click");
    $(".player-item").on("click", function(){
      shop.SellItem(player, $(this).text().trim());
      $("#gold").text(player.gold + "g");
      $("#character-inventory").html(updateList(player.inventory.items, "player-item"));
    });
  });
  $("#equip").on("click", function() {
    $(".player-item").off("click");
    $(".player-item").on("click", function(){
      if (player.EquipItem($(this).text().trim()) === "Success") {
        $(this).remove();
        $("#equippedItems").html(updateList(player.equipment, "equip-item"));
      }
    });
    $(".equip-item").off("click");
    $(".equip-item").on("click", function() {
      player.RemoveItem($(this).text().trim());

      $("#character-inventory").html(updateList(player.inventory.items, "player-item"));
      $("#equippedItems").html(updateList(player.equipment, "equip-item"));
    });
  });
  $("#next-level").on('click', function(){
    toggleBattleUI();
    monster = Monster.CreateMonster(level);
    battle = new Battle (monster, player);
    updateBattleUI(battle);
  });
});