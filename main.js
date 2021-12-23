import './style.css'

let peer = new Peer();
peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  document.querySelector('.js-my-id').innerHTML = id;
}); 

document.querySelector('.js-connect').onclick = () => {
  const destPeerId = document.querySelector('.js-peer-id').value;
  console.log(destPeerId);
  let conn = peer.connect('destPeerId');
  conn.send('yerd')
};

peer.on('connection', function(conn) { 
  console.log('Someone connected to me');
  console.log(conn);
});