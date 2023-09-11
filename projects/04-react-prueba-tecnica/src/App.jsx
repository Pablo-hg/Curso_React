import { useEffect, useState } from "react";
import './App.css';
import { getRandomFact } from "./services/fact";


const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';

export function App () {

    const [fact, setFact] = useState()
    const [imageURL, setimageURL] = useState()

 

    //Al dejar el array de dependencias vacio, hacemos que solo se ejecute la 1º vez que renderiza el componente
    //EFECTO QUE RECUPERA LA CITA AL CARGAR LA PÁGINA
    useEffect(() => {
        getRandomFact().then(setFact)
    }, []);

    //EFECTO QUE RECUPERA LA IMAGEN CADA VEZ QUE TENEMOS UNA CITA NUEVA
    //cada vez que cambia el "fact" (dependencias)....
    useEffect(() => {
        //si fact no es null...
        if(!fact) return
        // dividimos el string "fact" en un array (lo divido por espacios), obtenemos las 3 primeras posiciones y los juntamos entre espacios
        const threeFirstWord = fact.split(' ', 3).join(' '); 
                
        fetch(`https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`)
        .then(res => res.json())
        .then(response => {
            const { url } =  response
            setimageURL(url)
        })
    }, [fact])

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