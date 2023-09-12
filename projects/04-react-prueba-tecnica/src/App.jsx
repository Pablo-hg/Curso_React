
import './App.css';
import { useCatFact } from './hooks/useCatFact.js';
import { useCatImage } from './hooks/useCatImage.js';



export function App () {
    const {fact, refresfact} = useCatFact()
    const {imageURL} = useCatImage({fact})

    //funcion que recupera una cita al pulsar el boton
    const handleClick = async () => {
       refresfact()
    }
    
//{fact &&  <p>{fact}</p>} --> si "fact" se ha renderizado, renderizamos "fact" dentro de una etiqueta <p>
    return (
        <main>
            <h1>App de Gatitos</h1>

            <button onClick={handleClick}>Get new fact</button>
            {fact &&  <p>{fact}</p>}
            {imageURL &&  <img src={imageURL}
             alt={`Imagen extraida usando las 3º primeras palabras de ${fact}`} /> }

        </main>
    )
}