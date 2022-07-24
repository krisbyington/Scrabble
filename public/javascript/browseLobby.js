const { Socket } = require("socket.io");

searchResults = document.getElementById("lobby-search");
// console.log(searchResults);
console.log("about fetch");
fetch("browseLobby/refresh");

const createResult = (lobbyId) => {
    let lobby = document.createElement("div");
    lobby.className = "lobby";
    lobby.id = `lobby${lobbyId}`;

    let idDisplay = document.createElement("div");
    idDisplay.className = "lobby-section";
    idDisplay.innerText = `${lobbyId}`

    let inLobby = document.createElement("div");
    inLobby.className = "lobby-section";
    //this might change a bit 
    let anchor = document.createElement("a");
    anchor.setAttribute('href', `lobby/${lobbyId}`);

    let button = document.createElement("button");
    button.className = "button-section";
    button.innerText = "Join";

    anchor.appendChild(button);
    lobby.appendChild(idDisplay);
    lobby.appendChild(inLobby);
    lobby.appendChild(anchor);

    searchResults.appendChild(lobby);
}

socket.on( "refreshBrowseLobby" , (data) => {
    console.log("made it")
    console.log(data);

});

window.onload = (event) => {
    console.log("onloadevernt")
    fetch("browseLobby/refresh", {
        method:"get",
    });
  }
/* <div class="lobby-search">
{{#each lobbies}}
<div class="lobby" id="lobby-{{id}}">
    <div class="lobby-section">
        {{id}}
    </div>
    <div class="lobby-section">
        {{in_lobby}}
    </div>
    <a href="lobby/{{id}}">
        <button  class="button-section" >Join</button>
    </a>
</div>
{{/each}}
</div> */