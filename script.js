const myPeerId = document.querySelector(".js-my-peer-id");
const connectTo = document.querySelector(".js-peer-id");
const connectBtn = document.querySelector(".js-connect");
const msgs = document.querySelector(".js-msgs");
const composeMsg = document.querySelector(".js-compose-msg");
const sendMsgForm = document.querySelector(".js-send-msg-form");
const msgContainer = document.querySelector(".js-msg-container");

var peer = new Peer();

peer.on("open", conn => {
  myPeerId.innerHTML = peer.id;
});

peer.on("connection", function(conn) {
  msgContainer.classList.remove("d-none");
  conn.on("data", appendMsg);
});

connectBtn.onclick = () => {
  const destId = connectTo.value;
  const conn = peer.connect(destId);
  conn.on("data", appendMsg);
  msgContainer.classList.remove("d-none");
};

sendMsgForm.onsubmit = e => {
  e.preventDefault();
  const msg = composeMsg.value;
  composeMsg.value = "";

  for (const theirId in peer.connections) {
    if (typeof theirId == "undefined") {
      return;
    }
    peer.connections[theirId][0].send(msg);
  }
  appendMsg(msg);
};

const appendMsg = msg => {
  const li = document.createElement("li");
  li.innerText = msg;
  msgs.appendChild(li);
};
