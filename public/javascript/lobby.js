document.getElementsByClassName("ready-text");
const makeReady = async () => {
    pathArray = window.location.pathname.split("/");
    gameId = pathArray[2];
    console.log("clientside check", gameId);
    fetch(`/lobby/ready/${gameId}`, {
        body:JSON.stringify({"gameId":gameId}),
        method:"put",
        headers: { "Content-Type": "application/json" },
    });
    //try not using sockets and getting this to resolve correctly without hanging or refreshing
}

const makeUnready = () => {
    pathArray = window.location.pathname.split("/");
    gameId = pathArray[2];
    console.log("clientside check", gameId);
    fetch(`/lobby/unready/${gameId}`, {
        body:JSON.stringify({"gameId":gameId}),
        method:"put",
        headers: { "Content-Type": "application/json" },
    });
}

socket.on("madeReady", () => {
    console.log("madeReady")
});

socket.on("madeUnready", () => {
    console.log("madeUnready");
});

// const startGame = async () => {
//     pathArray = window.location.pathname.split("/");
//     gameId = pathArray[2];
//     console.log(gameId);
//     return await fetch("/game/start", {
//         body:JSON.stringify({"gameId":gameId}),
//         method:"post",
//         headers: { "Content-Type": "application/json" },
//         redirect: "follow",
//     });
// }