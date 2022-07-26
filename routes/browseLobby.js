const express = require("express");
const router = express.Router();
const db = require('../db');
const Game = require("../db/game");

router.get("/", async (request, response) => {
    let allGameData =  await Game.getAllGameInfo();
    let games = await Game.getGames();
    let clientData = [];
    for(game of games ){
        playerList = [];
        for(data of allGameData){
            if(game.id == data.game_id){
                playerList.push(data.username);
            }
        }
        if(game.in_lobby){
            clientData.push({
                id: game.id,
                players: playerList
            });
        }
    }
    response.render('browseLobby', {
        browseLobby: true,
        style: 'browseLobbyStyle',
        lobbies: clientData
    });
});

router.get("/refresh", async (request , response) =>{
    console.log("in refresh")
    let allGameData =  await Game.getAllGameInfo();
    let games = await Game.getGames();
    let clientData = [];
    for( game of games ){
        playerList = [];
        for(data of allGameData){
            if(game.id == data.game_id){
                playerList.push(data.username);
            }
        }
        clientData.push({
            id: game.id,
            in_lobby: game.in_lobby,
            players: playerList
        });
    }
    response.set("Content-Type", "application/json").send({clientData});
});

module.exports = router;
