const express = require("express");
const router = express.Router();
const db = require('../db');
const session = require('express-session');
const Game = require("../db/game");

router.get("/", (request, response) => {

  if (request.session) {
    response.render('lobby', {
      style: 'lobbyStyle',
    });
  } else {
    response.send("no session found :(")
  }
});

router.get("/:id", async (request, response) => {
  var gameID = request.params.id;
  var userID = request.session.user_id;
  var gameUsers;
  var game;
  var highestOrder = 0;

  gameData = await Game.getGameById(gameID);
  console.log("gameData", gameData);
  if(gameData.in_lobby == true){
    gameUsers = await Game.getGameUsers2(gameID);
  }
  console.log("gameUsers", gameUsers);
  let userInLobby = false;
  for (i = 0; i < gameUsers.length; i++) {
    if (gameUsers[i].user_id == userID) {
      userInLobby = true;
    }
  }
  if(!userInLobby){
    for (i = 0; i < gameUsers.length; i++) {
      highestOrder = Math.max(highestOrder, gameUsers[i].order);
    }
    await Game.joinGame(gameID, userID);
    await Game.updateGameUserOrder(gameID, userID, highestOrder + 1);
    gameUsers = await Game.getGameUsers2(gameID);
    response.render("lobby", {
      style: 'lobbyStyle',
      players: gameUsers,
      currUser: userID,
      gameId: gameID
    })
  }else{
    console.log("Rendering screen \n\n\n");
    response.render("lobby", {
      style: 'lobbyStyle',
      players: gameUsers,
      currUser: userID,
      gameId: gameID
    })
  }
  // console.log("gameData", gameData);
  // console.log("gameUsers", gameUsers);
  // Game.getGameById(gameID)
  //   .then((results) => {
  //     game = results;
  //     let inLobby = game.in_lobby;
  //     if (inLobby == true) {
  //     Game.getGameUsers2(gameID)
  //         .then((results) => {
  //           gameUsers = results;
  //           for (i = 0; i < gameUsers.length; i++) {
  //             if (gameUsers[i].user_id == userID) {
  //               console.log("redirecting to browselobby b/c gametiles")
  //               // response.redirect('/browseLobby');
  //               // return;
  //             }
  //           }
  //           for (i = 0; i < gameUsers.length; i++) {
  //             highestOrder = Math.max(highestOrder, gameUsers[i].order);
  //           }
  //           Game.joinGame(gameID, userID)
  //             .then(() => {
  //               Game.updateGameUserOrder(gameID, userID, highestOrder + 1)
  //                 .then(() => {
  //                   Game.getGameUsers2(gameID)
  //                     .then((gameUsers) => {
  //                       response.render('lobby', {
  //                         style: 'lobbyStyle',
  //                         players: gameUsers,
  //                         currUser: userID,
  //                         gameId: gameID
  //                       })
  //                     })
  //                 })
  //             })
  //         })
  //     }
  //   })
})

router.get("/leave/:id", (request, response) => {
  if (request.session) {
    let userId = request.session.user_id;
    let gameId = request.params.id;
    Game.removeFromLobby(gameId, userId)
      .then(() => {
        response.redirect("/browseLobby");
      })
  } else {
    console.log("NO SESSION");
  }
})

module.exports = router;

