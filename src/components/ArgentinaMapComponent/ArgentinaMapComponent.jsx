import { useState } from "react";
// Import the Component
import Argentina from "@react-map/argentina";

import "./styles.css"; // Estilos para el mapa


const ArgentinaMapComponent = () => {
    
  const [selectedProvice, setselectedProvice] = useState(null);

  return (
    <div className="map-container">
        {/* <p>Provincia seleccionada es {selectedProvice}</p> */}
        <Argentina
            size={300}
            mapColor="rgba(0,0,0,0.2)"
            strokeColor = "rgba(0,0,0,0)"
            strokeWidth="12"
            hoverColor="aqua"
            type='select-single'
            selectColor="#00A3E4"
            onSelect = {setselectedProvice}
        />
    </div>
  );
};

export default ArgentinaMapComponent;
