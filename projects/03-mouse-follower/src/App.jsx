import { useEffect, useState } from "react";
import "./App.css";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  //se deberia de inicializar ele stado ccon el tipo de datos que se utilizará
  //o inicializarlo en "null" si está muy claro
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    //Queremos que el efecto se ejecutará cada vez que cambia el "enable".
    // --> se imprime "efecto" seguido del valor de "enabled" cuando "enabled cambia de valor"
    console.log("efecto", { enabled });
    const handleMove = (event) => {
      //clientX y clientY son las coordenadas del puntero
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    //hay que limpiar las suscipciones. CLEANUP
    //Suscripciones --> son las condiciones que hay dentro del 1º parámetro
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }
    //Para limpiar las suscripciones, hacemos que el "useEffect" haga un return.
    //EL return se ejcutará:
    // --> cuando "App" ha terminnado de renderizarse
    // --> cuando cambie la dependencia (el array del 2º parámetro).
    //con "getEventListeners(window)" (en este caso el que carga el evento es "windows")
    //podemos cuales y cuantos eventos hay activos
    return () => {
      console.log("cleanup");
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#09F",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate( ${position.x}px, ${position.y}px)`,
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};

function App() {
  const [mounted, setMounted] = useState(true);
  /* 
  
  */
  return (
    <main>
      {/* Si está montado , renderizamos el "followMouse" */}
      {mounted && <FollowMouse />}
      {/* Creamos un boton que hace un renderizado condicional (que de forma condicional)
      renderiza el componente que siga el "mouse" */}
      <button onClick={() => setMounted(!mounted)}>
        Toggle mounted FolllowMouse component
      </button>
    </main>
  );
}

export default App;
