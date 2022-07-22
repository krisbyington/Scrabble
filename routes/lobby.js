const express = require("express");
const router = express.Router();
const db = require('../db');
const session = require('express-session');
const game = require("../db/game");

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
  var gameData;
  var highestOrder = 0;
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

    response.render("lobby", {
      style: 'lobbyStyle',
      players: gameUsers,
      currUser: userID,
      gameId: gameID
    })
  }else{
    response.render("lobby", {
      style: 'lobbyStyle',
      players: gameUsers,
      currUser: userID,
      gameId: gameID
    })
  }
})

router.get("/leave/:id", (request, response) => {
  if (request.session) {
    let userId = request.session.user_id;
    let gameId = request.params.id;
    game.removeFromLobby(gameId, userId)
      .then(() => {
        response.redirect("/browseLobby");
      })
  } else {
    console.log("NO SESSION");
  }
})

router.use("/startGame/:id", async (request, response) => {
  let GameUsers = await game.getGameUsers2(request.body.Id);
  let allReady = false;
  // for(user in gameUsers){
  //   if(user.is_ready == true){
  //     allReady = true;
  //   }else{
  //     allReady = false;
  //     break;
  //   }
  // }
  await game.startGame(request.params.id);
  response.redirect(`/game/${request.params.id}`);
});

router.use("/ready/:id", async (request, response) => {
  let userId = request.session.user_id;
  let gameId = request.params.id
  let result = await game.makeReady(gameId, userId);
  let isReady = result[0].is_ready;
  if(isReady){
    username = await game.getUserNameFromId(userId);
    request.app.get("io").sockets.to("lobby" + request.params.id).emit("madeReady", {username});
    console.log(username);
  }
});

router.use("/unready/:id", async (request, response) => {
  let userId = request.session.user_id;
  let gameId = request.params.id
  let result = await game.makeUnready(gameId, userId);
  let isReady = result[0].is_ready;
  if(!isReady){
    username = await game.getUserNameFromId(userId);
    request.app.get("io").sockets.to("lobby" + request.params.id).emit("madeUnready", {username});
    console.log(username);
  }
  // .then(results => {
  //   console.log("db returning", results[0].is_ready);
  //   if(!results[0].is_ready){
  //     username = game.getUserNameFromId(userId);
  //     console.log(username);
  //     request.app.get("io").sockets.to("lobby" + request.params.id).emit("madeUnready");
  //   }
  // });
})

module.exports = router;

