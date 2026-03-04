let peer = new RTCPeerConnection();
let channel = peer.createDataChannel("game");

channel.onmessage = (event) => {
  let data = JSON.parse(event.data);
  updateOtherPlayer(data);
};

function sendPosition(player){
  channel.send(JSON.stringify({
    x: player.position.x,
    y: player.position.y,
    z: player.position.z
  }));
}
