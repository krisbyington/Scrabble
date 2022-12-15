const startGame = async (gameId) => {
    fetch(`/lobby/startGame/${gameId}`, {
        method:"get",
        redirect: "follow",
    });
}


const addPlayerToLobby = (username) => {
    let playerList = document.getElementById("player-list");

    let container = document.createElement("div");
    container.className = "player";

    let playerSection = document.createElement("div");
    playerSection.className = "player-section"; 

    let playerText = document.createElement("p");
    playerText.className = "player-text";
    playerText.id = username.username.username;
    playerText.innerText = username.username.username;

    playerSection.append(playerText); 
    container.append(playerSection);

    let readySection = document.createElement("div");
    readySection.className = "player-section"; 

    readyText = document.createElement("p");
    readyText.className = "ready-text";
    readyText.innerText = "Not Ready";

    readySection.append(readyText); 
    container.append(readySection);
    playerList.append(container);
    
}

socket.on("startGame", (gameRoute) => {
    console.log(gameRoute.route);
    window.location.href = gameRoute.route;
});

socket.on("playerJoined", (username) => {
    let playerName = username.username.username;
    let players = document.getElementsByClassName("player-list")[0].children;
    let inLobby = false;
    for(player of players){
        console.log(player.children[0].children[0].id);
        console.log("player", playerName);
        if(player.children[0].children[0].id == playerName){
            inLobby = true;
            break;
        }
    }
    if(!inLobby){
        addPlayerToLobby(username);
    }
})

socket.on("playerLeft", (username) => {
    // console.log("player", username);
    let playerName = username.username.username;
    let players = document.getElementsByClassName("player-list")[0].children;
    for(player of players){
        console.log(player);
        console.log("player", playerName);
        if(player.children[0].children[0].id == playerName){
            player.remove();
            break;
        }
    }
});
