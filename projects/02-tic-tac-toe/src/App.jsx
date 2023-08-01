import { useState } from "react";
import "./App.css";

//creamos los turnos de los jugadores con su valor
const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  //LOS ESTADOS HAY QUE TRATARLOS SIEMPRE COMO INMUTABLES (NO SE DEBEN MODIFICAR)

  //cambiamos el "board" para que ahora sea un estado
  //creamos un array de dos posiciones, la 1º es el "board" y la segunda es el "actualizador" del "board"
  //a la funcion "useState", le pasamos el estado inicial que quereamos, en este caso, el array de 9 vacio
  const [board, setBoard] = useState(Array(9).fill(null));

  //creamos un estado para los turnos
  const [turn, setTurn] = useState(TURNS.X);

  //creamos un estado a el ganador
  const [winner, setWinner] = useState(null); //null --> no hay ganador, false --> empate

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combianaciones ganadores
    // para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && // 0 --> "x" u "o"
        boardToCheck[a] === boardToCheck[b] && // 0 y 3 --> "x" y "x" u "o" y "o"
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    //si no hay ganador
    return null;
  };

  const checkEndGame = (newBoard) => {
    //revisamos si hay un empate --> si no hay más espacio vacios en el tablero
    //array.every() --> si todas las posiciones del array
    return newBoard.every((square) => square !== null); // si todas los "square" son "x" u "o"
  };

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
    // revisamo si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      //LA ACTUALIZACION DE EL ESTADO ES ASINCRONO --> no bloquea el renderizado
      //El alert se ejecuta antes que el "setWinner" porque el "setWinner" no es sincrono
      setWinner(newWinner); //actualizamos el estado
      //alert(`El ganador es ${newWinner}`);
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
      {/* Creamos un renderizado condicional para cuando ha acabado el game*/}
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Ganó:"}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
