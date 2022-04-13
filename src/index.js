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
      $("#shop-screen").show();

      let shopHTML = "<ul>";
      shop.inventory.items.forEach((item) => {
        shopHTML += `<li class='shop-item'> ${item.name}: [str: ${item.str}, dex: ${item.dex}, int: ${item.int}] ${item.value * 1.5}g`;
      });
      shopHTML += "</ul>";

      $("#shop-inventory").html(shopHTML);

      $(".shop-item").on("click", function() {
        $(this)
      });

      shop = new Shop(5, monster.level);
    }
    else if (result === "lose") {
      $("#game-over").show();
    }
  });
  $("#buy-item").on("click", function() {
    
  });
  
});

/*
function createCardGrid(deck) {
  let gridHTML = "";
  let cardsPerRow = (deck.size / deck.numRows);
  let spacingColumns = ((document.body.clientWidth - (cardsPerRow * 100)) / 2) + "px";

  for (let i = 0; i < deck.numRows; i++) {
    gridHTML += "<div class='row'>";
    gridHTML += "<div style='width: " + spacingColumns + "'></div>";
    for (let j = 0; j < cardsPerRow; j++) {
      gridHTML += "<div id='" + i + "-" + j + "' class='card text-center'>" + "</div>";
    }
    gridHTML += "</div></div>";
  }
  return gridHTML;
}

$("#game").html(createCardGrid(deck));
*/