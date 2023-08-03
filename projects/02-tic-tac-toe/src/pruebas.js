const { useEffect } = require("react");
const { useState } = require("react");

const Component = () => {
  const [value, setValue] = useState(false);

  //"useEffect" recibe dos parámetros (el 2º es opcional):
  //1º Código para ejecutar
  //2º Lista de las dependencias --> tiene que ser un array
  //useEffect(codeToExecute, listOfDependencies)

  //como mínimo se ejecutará una vez,
  //si no hay 2º parámetro, el codigo dentro del 1º parámetro se ejecutará
  // cada vez que se renderize el componete

  useEffect(() => {
    console.log("hola que tal");
  });
};
