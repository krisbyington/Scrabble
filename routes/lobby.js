const express = require("express");
const router = express.Router();
const db = require('../db');
const session = require('express-session');
const game = require("../db/game");

router.get("/", (request, response) => {

  if (request.session) {
    response.render('lobby', {
      lobby: true,
    });
  } else {
    response.send("no session found :(")
  }
});

router.get("/:id", async (request, response) => {
  var gameID = request.params.id;
  var userID = request.session.user_id;
  var username;
  var gameUsers;
  var gameData;
  var highestOrder = 0;

  username = await game.getUserNameFromId(userID);
  gameData = await game.getGameById(gameID);
  if(gameData.in_lobby == true){
    gameUsers = await game.getGameUsers2(gameID);
  }
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
    await game.joinGame(gameID, userID);
    await game.updateGameUserOrder(gameID, userID, highestOrder + 1);
    gameUsers = await game.getGameUsers2(gameID);
    request.app.get("io").sockets.to("lobby" + gameID).emit("playerJoined", {username});
    response.render("lobby", {
      lobby: true,
      style: 'lobbyStyle',
      players: gameUsers,
      currUser: userID,
      gameId: gameID
    })
  }else{
    request.app.get("io").sockets.to("lobby" + gameID).emit("playerJoined", {username});
    response.render("lobby", {
      lobby: true,
      style: 'lobbyStyle',
      players: gameUsers,
      currUser: userID,
      gameId: gameID
    })
  }
})

router.get("/leave/:id", async (request, response) => {
  if (request.session) {
    let userId = request.session.user_id;
    let gameId = request.params.id;
    username = await game.getUserNameFromId(userId);
    request.app.get("io").sockets.to("lobby" + gameId).emit("playerLeft", {username});
    game.removeFromLobby(gameId, userId)
      .then(() => {
        response.redirect("/browseLobby");
      })
  } else {
    console.log("NO SESSION");
    response.sendStatus(403);
  }
})

router.use("/startGame/:id", async (request, response) => {
  await game.startGame(request.params.id);
  request.app.get("io").sockets.to("lobby" + request.params.id).emit("startGame",{route: `/game/${request.params.id}`});
});


module.exports = router;

