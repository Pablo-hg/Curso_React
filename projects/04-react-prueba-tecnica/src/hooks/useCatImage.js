import { useEffect, useState } from "react";

//Para crear un Custom Hooks lo que debemos hacer es crear una funcion,
//que empieze por "use" y siga por lo que va a hacer
export function useCatImage({fact}) {
    const [imageURL, setimageURL] = useState()

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
    return {imageURL}
} // devuelve {imageUrl: 'htpps://...'}