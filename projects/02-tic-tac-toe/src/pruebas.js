const { useEffect } = require("react");
const { useState } = require("react");

const Component = () => {
  const [value, setValue] = useState(false);

  //"useEffect" recibe dos parámetro:
  //1º Código para ejecutar
  //2º Lista de las dependencias
  //useEffect(codeToExecute, listOfDependencies)
  useEffect(() => {
    console.log("hola que tal");
  }, listOfDependencies);
};
