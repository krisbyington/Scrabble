const e = require("express");
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
        clientData.push({
            id: game.id,
            in_lobby: game.in_lobby,
            players: playerList
        });
    }
    // console.log('clientdata', clientData)
    // console.log("routes/browselobby", games[0]);
    // console.log("routes/browselobby", allGameData[0]);

    response.render('browseLobby', {
        style: 'style',
        lobbies: clientData
    });
});

router.get("/refresh", async (request , response) =>{
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
    request.app.get("io").emit("refreshBrowseLobby",{clientData});
})

// router.get("/leave/:id", (request, response) => {
//     if (request.session) {
//         let userId = request.session.user_id;
//         let gameId = request.params.id;
//         Game.removeFromLobby(gameId, userId)
//             .then(() => {
//                 response.redirect("/browseLobby");
//             })
//     } else {
//         console.log("NO SESSION");
//     }
//     Game.removeFromLobby(request.session.id)
// })

module.exports = router;
