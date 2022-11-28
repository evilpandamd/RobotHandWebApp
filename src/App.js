import './App.css';
import socketIO from 'socket.io-client';
import { io } from 'socket.io-client';
import { useEffect,useState } from 'react';

// const socket = socketIO.connect('http://localhost:4000');
const ENDPOINT = 'http://localhost:4000';

let socket;
const initiateSocketConnection = () => {
	socket = io(ENDPOINT);
	console.log(`Connecting socket...`);
}

const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

function App() {
  const [response,setResponse] = useState('');
  const [isLeft,setIsLeft] = useState(false);
  const [isRight,setIsRight] = useState(false);
  const [isUp,setIsUp] = useState(false);
  const [isDown,setIsDown] = useState(false);


  useEffect(() => {
    initiateSocketConnection();
    return () => {
      disconnectSocket();
    }
  },[]);

  useEffect(() => {
    const socket = socketIO(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
      if(data.left === 1) {
        setIsLeft(true);
      }
      else if(data.left === 0) {
        setIsLeft(false);
      }
      if(data.right === 1) {
        setIsRight(true);
      }
      else if(data.right === 0) {
        setIsRight(false);
      }
      if(data.up === 1) {
        setIsUp(true);
      }
      else if(data.up === 0) {
        setIsUp(false);
      }
      if(data.down === 1) {
        setIsDown(true);
      }
      else if(data.down === 0) {
        setIsDown(false);
      }
    });
  },[]);

  // console.log(response)
  return (
<>
<div className= "rotateMode" >
<div className= {`arr left ${isLeft ? "redBackground" : "whiteBackground"}`}><div></div></div>
<div className= {`arr right ${isRight ? "redBackground" : "whiteBackground"}`}><div></div></div>
<div className= {`arr up ${isUp ? "redBackground" : "whiteBackground"}`}><div></div></div>
<div className= {`arr down ${isDown ? "redBackground" : "whiteBackground"}`}><div></div></div>
</div>

</>
  );
}

export default App;
