import "./App.css"
import { useEffect, useState, useRef } from "react"
import Countdown, { zeroPad } from 'react-countdown';

function App() {

  const [turn, setTurn] = useState("");
  const [timer, setTimer] = useState("");



  const clockWhite = useRef();
  const clockBlack = useRef();
  const timerStart = useRef();



  useEffect(() => {
    if (turn === "start") {
      clockBlack.current.pause();
      clockWhite.current.pause();
    }
    if (turn === "white") {
      clockWhite.current.start();
      clockBlack.current.pause();
    } if (turn === "black") {
      clockBlack.current.start();
      clockWhite.current.pause();
    }
    localStorage.setItem("turn", turn);
    localStorage.setItem("timer", timer);
  }, [turn, timer]);

  const rendererBlack = ({ total, hours, minutes, seconds, completed }) => {

    if (completed) {
      return <span>Vous avez perdu !</span>;
    }

    let value = zeroPad(hours) + ":" + zeroPad(minutes) + ":" + zeroPad(seconds);
    return (<input className="clock" readOnly value={value} type="text"></input>);
  };

  const rendererWhite = ({ total, hours, minutes, seconds, completed, pause }) => {

    if (completed) {
      return <span>Vous avez perdu !</span>;
    }
    let value = zeroPad(hours) + ":" + zeroPad(minutes) + ":" + zeroPad(seconds);
    return (<input className="clock" readOnly={true} value={value} type="text"></input>);
  };


  const handleTurn = (e) => {
    setTurn(turn === "white" ? "black" : "white")
  }


  const StartButton = () => {
    if (turn === "white") {
      return (<button onClick={handleTurn} className="button-game"><span className="white">{turn}</span></button>)
    }
    if (turn === "black") {
      return (<button onClick={handleTurn} className="button-game"><span className="black">{turn}</span></button>)
    }
    else {
      return (<button onClick={handleTurn} className="button-game"><span className="white">Start</span></button>)
    }
  }

  const startGame = () => {
    let value = timerStart.current.value;
    setTurn("start");
    setTimer(new Date(Date.now() + parseInt(value)));
  }

  if (turn === "") {
    return (
      <div>
      <h1>Début du jeu</h1>
      <select ref={timerStart}>
        <option value="300000">5 Minutes</option>
        <option value="600000">10 Minutes</option>
      </select>
      <button onClick={startGame}>Démarrer la partie</button>
    </div>)
  }


  return (
    <div className="App">
      <div className="side black">
        <Countdown
          ref={clockBlack}
          date={timer}
          autoStart={false}
          renderer={rendererBlack}
        />
      </div>
      <StartButton />
      <div className="side white">
        <Countdown
          date={timer}
          autoStart={false}
          renderer={rendererWhite}
          ref={clockWhite}
        />
      </div>
    </div>
  );
}

export default App;
