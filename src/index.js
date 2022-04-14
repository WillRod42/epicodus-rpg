import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Character from "./js/character";
import Monster from "./js/monster";
import Battle from "./js/battle";
import Shop from "./js/shop";
// import Item from "./js/item";
import { Warrior } from "./js/class";
// import { Assassin } from "./js/class";
// import { Wizard } from "./js/class";

$(document).ready(function() {
  let player = new Character('name', new Warrior());
  let monster = Monster.CreateMonster(1);
  let battle = new Battle(monster, player);
  let shop = new Shop(5, 1);
  

  $("#character-hp").text(player.hp);
  $("#monster-hp").text(monster.hp);
  
  $("#character-attack").on("click", function(){
    let result = battle.Turn("attack");
    $("#character-hp").text(player.hp);
    $("#monster-hp").text(monster.hp);
    if (result === "win") {
      let inventoryHTML = "<ul>";
      player.inventory.items.forEach((item) =>{
        inventoryHTML += `<li class='player-item'> ${item.ToString()}`;
      });
      inventoryHTML += "</ul>";
      $("#character-inventory").html(inventoryHTML);

      shop = new Shop(5, monster.level);
      $("#shop-screen").show();

      let shopHTML = "<ul>";
      shop.inventory.items.forEach((item) => {
        shopHTML += `<li class='shop-item'> ${item.ToString()}`;
      });
      shopHTML += "</ul>";

      $("#shop-inventory").html(shopHTML);
      $("#gold").text(player.gold);

      $(".shop-item").on("click", function() {
        if(shop.BuyItem(player, $(this).text().trim())) {
          $(this).remove();
          $("#gold").text(player.gold);
          let inventoryHTML = "<ul>";
          player.inventory.items.forEach((item) =>{
            inventoryHTML += `<li class='player-item'> ${item.ToString()}`;
          });
          inventoryHTML += "</ul>";
          $("#character-inventory").html(inventoryHTML);
        }
      });
      
    }
    else if (result === "lose") {
      $("#game-over").show();
    }
  });
  $("#sell-item").on("click", function() {
    $(".player-item").off("click");
    $(".player-item").on("click", function(){
      shop.SellItem(player, $(this).text().trim());
      let inventoryHTML = "<ul>";
      player.inventory.items.forEach((item) =>{
        inventoryHTML += `<li class='player-item'> ${item.ToString()}`;
      });
      inventoryHTML += "</ul>";
      $("#character-inventory").html(inventoryHTML);
      $("#gold").text(player.gold);
    });
  });
  $("#equip-item").on("click", function() {
    $(".player-item").off("click");
    $(".player-item").on("click", function(){
      if (player.EquipItem($(this).text().trim()) === "Success") {
        $(this).remove();
      
        let equippedHTML = "<ul>";
        player.equipment.forEach((item) => {
          equippedHTML += `<li class='equip-item'> ${item.ToString()}`;
        });
        equippedHTML += "</ul>";
        $("#equippedItems").html(equippedHTML);
      }
    });
    $(".equip-item").off("click");
    $(".equip-item").on("click", function() {
      
      player.RemoveItem($(this).text().trim());
      let removeHTML  = "<ul>";
      player.equipment.forEach((item) => {
        removeHTML += `<li class='equip-item'> ${item.ToString()}`;
      });
      removeHTML += "</ul>";
      let inventoryHTML = "<ul>";
      player.inventory.items.forEach((item) =>{
        inventoryHTML += `<li class='player-item'> ${item.ToString()}`;
      });
      inventoryHTML += "</ul>";
      $("#character-inventory").html(inventoryHTML);
      $("#equippedItems").html(removeHTML);
    });
  });
  
  
});