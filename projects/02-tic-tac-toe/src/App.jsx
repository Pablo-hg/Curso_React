import confetti from "canvas-confetti";
import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";
import { TURNS } from "./constant";
import { checkEndGame, checkWinner } from "./logic/board";
import { resetGameStorage, saveGameStorage } from "./logic/storage";

function App() {
  //LOS ESTADOS HAY QUE TRATARLOS SIEMPRE COMO INMUTABLES (NO SE DEBEN MODIFICAR)

  //LOS "useState" NUNCA PUEDEN IR DENTRO DE UN IF
  //LEER DEL LOCALSTORAGE ES LENTO, ES SINCRONO Y BLOQUEA
  //creamos una funcion dentro del "useState" para recuperar los datos dentro de localStorage:
  //guardamos en una variable los datos del item "board",
  //hacemos que la funcion devuelva el array vacio o el valor del "localstoge"
  //dependiendo si había algo guardado
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  //cambiamos el "board" para que ahora sea un estado
  //a la funcion "useState", le pasamos el estado inicial que quereamos, en este caso, el array de 9 vacio
  //const [board, setBoard] = useState(Array(9).fill(null));

  //creamos un estado para los turnos
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    // devolvemos "turnFromStorage" si "turnFromStorage" tiene un valor,
    //pero si es nulo o indefinido, devolvemos "TURNS.X"
    return turnFromStorage ?? TURNS.X;
  });

  //creamos un estado a el ganador
  const [winner, setWinner] = useState(null); //null --> no hay ganador, false --> empate

  //actualizamos el tablero estableciendo el nuevo turno
  const updateBoard = (index) => {
    //no actualizamos si ya tiene algo o
    //si ya tenemos un ganador
    if (board[index] || winner) return;
    //const newArray = [...array] --> creamos una copia superficial , es decir, duplicamos el array sin modificar el original
    //actualizamos el tableto creando uno "nuevo"
    const newBoard = [...board];
    newBoard[index] = turn; // "x" u "o"
    setBoard(newBoard);
    //cambiamos el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //agudamos la partida
    saveGameStorage({ board: newBoard, turn: newTurn });
    // revisamo si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      //LA ACTUALIZACION DE EL ESTADO ES ASINCRONO --> no bloquea el renderizado
      //El alert se ejecuta antes que el "setWinner" porque el "setWinner" no es sincrono
      setWinner(newWinner); //actualizamos el estado
      //alert(`El ganador es ${newWinner}`);
      confetti();
    }
    //chequeamos si el game tiene ganador
    else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  //RESETEAMOS EL GAME
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset Game </button>
      <section className="game">
        {/*  Aquí, estamos utilizando el método map() de la matriz board.
        El map() recibe una función que se ejecuta para cada elemento de la matriz.
        En este caso, la función tiene dos parámetros, el primer parámetro es el valor
        actual del elemento en la iteración (en este caso, se usa como _ para indicar que no se utilizará)
        y el segundo parámetro es el índice del elemento en la matriz. */}
        {board.map((square, index) => {
          return (
            /* Para renderizar una lista de elementos, necesitamos usar la key.
              La "Key" es un identificador unico de ese elemento. Index es el valor actual */
            /* a updateBoard le pasamos al funcion "updateBoard", no la funcion (que seria updateBoard(),
            ya que si le pasamos la ejecucion de la funcion,se ejecutaría 9 veces, y lo que queremos es que solo se ejecute
            cuando cuando el usuario haga click*/
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
