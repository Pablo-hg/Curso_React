const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

/*export const getRandomFact = () => {
    return fetch(CAT_ENDPOINT_RANDOM_FACT)  // Realiza una solicitud GET a la URL proporcionada
        .then(res => res.json())  // Convierte la respuesta ("res") en formato JSON
        .then(data => { //del objeto "data" (que son los datoa del json), accedemos al "fact"
            const { fact } = data // del "data" recuperamos el hecho
            return setFact(fact) // establecemos el "fact"
        })  
}*/

//ES LO MISMO QUE LO ANTERIOR PERO CON ASYNC
export const getRandomFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT) // Realiza una solicitud GET a la URL proporcionada
    const data = await res.json() // del "data" recuperamos el hecho
    const { fact } = data; // del "data" recuperamos el hecho
    return fact // establecemos el "fact"     
}