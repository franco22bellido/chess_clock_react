import { useState, useEffect} from "react";
// Crear una funcion que setee el tiempor para ambos jugadores,
// Seria mejor que los timers para cada jugador sean un array en lugar de un estado cada uno.
// un formulario para elegir el tiempo de la partida.
// cuanto es el turno de alguien, que se deshabilite el boton
// cuando un contador llegue a cero, entonces habra ganado el equipo contrario
function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timePlayerOne, setTimePlayerOne] = useState(0);
  const [timePlayerTwo, setTimePlayerTwo] = useState(0);
  const [turn, setTurn] = useState(0);
  const [timerId, setTimerId] = useState(0);
  const [inputValue, setInputValue] = useState('');


  const setTimeOfPlayers = ()=> {
      setTimePlayerOne(timeLeft / 2);
      setTimePlayerTwo(timeLeft / 2);
  }

  const stopLastTimeLeft = ()=> {
    clearInterval(timerId);
  }
  
  const changeTurn = (playerId)=> {
    stopLastTimeLeft();
    setTurn(playerId);
  }

  const decrementTimeLeft = () => {
    if( turn === 1 && timePlayerOne !== 0 ) {
      setTimePlayerOne(timePlayerOne => timePlayerOne - 1)
    } else if( turn === 2 && timePlayerTwo !== 0) {
      setTimePlayerTwo(timePlayerTwo => timePlayerTwo - 1)
    }
  }
  const startTimeLeft = () => {
    let timer_id = setInterval(() => decrementTimeLeft(), 1000);
    setTimerId(timer_id);
  }

  
  useEffect(()=> {
    if(turn !== 0) startTimeLeft();
  },[turn])
  useEffect(()=> {
    setTimeOfPlayers();
  }, [timeLeft])
  return (
    <div className="flex-center">
      {/* <h1>Chess clock</h1> */}
      <form className="form" onSubmit={(e)=> {e.preventDefault(); stopLastTimeLeft(); setTurn(0);setTimeLeft(inputValue*60); setInputValue('')}}>
        <input className="form-input" type="number" placeholder="Escribe el tiempo total" value={inputValue} onChange={(e)=> {setInputValue(e.target.value)}}/>
        <button disabled={inputValue === '' ? true : false} type="submit">Establecer</button>
      </form>
      <button disabled={turn === 1 ? true : false} className="player-button" onClick={()=> changeTurn(1)}> {Math.floor(timePlayerOne / 60)}:{timePlayerOne % 60}</button>
      <button disabled={turn === 2 ? true : false} className="player-button" onClick={()=> changeTurn(2)}>{Math.floor(timePlayerTwo / 60)}:{timePlayerTwo % 60}</button>
    </div>
  )
}

export default App
