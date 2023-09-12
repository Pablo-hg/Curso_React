import { useEffect, useState } from "react";
import './App.css';
import { useCatImage } from "./hooks/useCatImage";
import { getRandomFact } from "./services/fact";

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';

export function App () {

    const [fact, setFact] = useState()
    const {imageURL} = useCatImage({fact})

    //Al dejar el array de dependencias vacio, hacemos que solo se ejecute la 1º vez que renderiza el componente
    //EFECTO QUE RECUPERA LA CITA AL CARGAR LA PÁGINA
    useEffect(() => {
        getRandomFact().then(newFact => setFact(newFact))// es lo mismo que getRandomFact().then(setFact) 
    }, []);


    //funcion que recupera una cita al pulsar el boton
    const handleClick = async () => {
       const newFact = await getRandomFact()
       setFact(newFact)
    }
    
//{fact &&  <p>{fact}</p>} --> si "fact" se ha renderizado, renderizamos "fact" dentro de una etiqueta <p>
    return (
        <main>
            <h1>App de Gatitos</h1>

            <button onClick={handleClick}>Get new fact</button>
            {fact &&  <p>{fact}</p>}
            {imageURL &&  <img src={`${CAT_PREFIX_IMAGE_URL}${imageURL}`}
             alt={`Imagen extraida usando las 3º primeras palabras de ${fact}`} /> }
        </main>
    )
}