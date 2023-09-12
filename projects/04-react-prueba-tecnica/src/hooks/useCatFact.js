import { useEffect, useState } from "react";
import { getRandomFact } from "../services/fact";

export const useCatFact = () => {
    const [fact, setFact] = useState()

    const refresfact = () => {
        getRandomFact().then(newFact => setFact(newFact))// es lo mismo que getRandomFact().then(setFact) 
    }
    //Al dejar el array de dependencias vacio, hacemos que solo se ejecute la 1º vez que renderiza el componente
    //EFECTO QUE RECUPERA LA CITA AL CARGAR LA PÁGINA
    useEffect(refresfact, []);

    return {fact, refresfact}
}