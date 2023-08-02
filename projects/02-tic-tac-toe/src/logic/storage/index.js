export const saveGameStorage = ({ board, turn }) => {
  // guardamos la partida antes de comprobar si hay ganador
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
