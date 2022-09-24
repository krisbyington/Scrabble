searchResults = document.getElementById("lobby-search");

const refresh = () =>{
    let lobbyData;
    fetch("browseLobby/refresh", {
        method:"get",
        headers: { "Content-Type": "application/json" },
    }).then( (response) => {
        response.json()
        .then( (data) => {
            lobbyData = data.clientData;
            createResult(lobbyData);
        })
    });
}

const createResult = (data) => {
    for(result of searchResults.children){
        resultId = result.id.split("-")[1];
        for(fetchResult of data){
            if(resultId == fetchResult.id){
                if(fetchResult.in_lobby){
                    continue;
                }else{
                    result.remove();
                }
            }
        }
    }
    for(fetchResult of data){
        let isNew = true;
        for(result of searchResults.children){
            resultId = result.id.split("-")[1];
            if(resultId == fetchResult.id){
                isNew = false;
            }
        }
        if(isNew && fetchResult.in_lobby){

            let lobby = document.createElement("div");
            lobby.className = "lobby";
            lobby.id = `lobby-${fetchResult.id}`;
        
            let idDisplay = document.createElement("div");
            idDisplay.className = "id-section";
            idDisplay.innerText = `${fetchResult.id}`
        
            let hostSection = document.createElement("div");
            hostSection.className = "host-section";
        
            let host = document.createElement("p");
            host.className = "host";
            host.innerText = fetchResult.players[0];
            
            let buttonSection = document.createElement("div");
            buttonSection.className = "button-section";
        
            let anchor = document.createElement("a");
            anchor.setAttribute('href', `lobby/${fetchResult.id}`);
        
            let button = document.createElement("button");
            button.className = "join-button";
            button.innerText = "Join";

            anchor.append(button);
            buttonSection.append(anchor);

            hostSection.append(host);

            lobby.append(idDisplay);
            lobby.append(hostSection);
            lobby.append(buttonSection);

            searchResults.append(lobby);
        }
    }
}

setInterval(refresh, 500);
