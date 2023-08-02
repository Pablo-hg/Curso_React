import { WINNER_COMBOS } from "../constant";

export const checkWinner = (boardToCheck) => {
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
