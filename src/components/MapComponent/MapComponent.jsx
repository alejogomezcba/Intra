import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import PropTypes from 'prop-types';

import CabaSVG from '../../assets/caba'; 
import NacionSVG from '../../assets/nacion';

//Global styles
import { globalColors } from "../../utils/styles";

import './style.css'

const MapComponent = ({ selectedProvinces, setSelectedProvince, setSelectedProvinces }) => {

  const [geoData, setGeoData] = useState(null); // Estado para cargar los datos del GeoJSON

  const [hoveredProvince, setHoveredProvince] = useState(null); // Estado para rastrear la provincia en hover

  const handleMouseEnter = (provinceName) => {
    setHoveredProvince(provinceName);
  };

  const handleMouseLeave = () => {
    setHoveredProvince(null);
  };


  // Cargar el archivo GeoJSON al montar el componente
  useEffect(() => {
    fetch("/geo/ProvinciasArgentina.geojson")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error cargando GeoJSON:", error));
  }, []);

  const getColor = (provinceName) => {
   
    const provinces = selectedProvinces || []; // Valida que selectedProvinces sea un arreglo
    const province = provinces.find((p) => p?.province === provinceName);

    if (province) {
      if (province.opacity !== undefined) {
        const opacityValue = province.opacity / 100; // Convertir a rango 0-1
        return `${globalColors.colorForOpacity}, ${opacityValue})`; // Color #00A3E4 con opacidad
      } else {
        if (province.value >= 70) {
          return globalColors.green;
        } else if (province.value >= 40 && province.value <= 69.99) {
          return globalColors.yellow;
        } else if (province.value >= 0 && province.value <= 39.9) {
          return globalColors.red; 
        }
        return globalColors.blue ; // Color al hacer clic
      }
    }
    return globalColors.gray ; // Gris por defecto
  };

  const handleProvinceClick = (provinceName) => {
    setSelectedProvince(provinceName);
    setSelectedProvinces([{ province: provinceName, color: "#00A3E4" }]); // Define el color al hacer clic
    // setSelectedFilter(null);
  };

  const splitText = (text) => {
    const words = text.split(' '); // Divide el texto en palabras
    const lines = [];
  
    // Agrupa las primeras dos palabras en la primera línea
    const firstLine = words.slice(0, 2).join(' ');
    const secondLine = words.slice(2).join(' '); // Toma las palabras restantes como segunda línea
  
    lines.push(firstLine, secondLine);
    return lines;
  };

  // Función para manejar el renderizado fuera del mapa para CABA y Nación
  const renderSpecialProvinces = () => {
    const specialProvinces = ['CABA', 'Nación']; // Provincias especiales
    return specialProvinces.map((province, index) => {
      const isHovered = hoveredProvince === province; // Verifica si la provincia está en hover
      const color = isHovered ? globalColors.blue : getColor(province); // Cambia el color dinámico en hover
      const position = index === 0 ? [530, 240] : [430, 400]; // Posiciones fuera del mapa
      return (
        <g
          key={province}
          transform={`translate(${position[0]}, ${position[1]})`}
          onClick={() => handleProvinceClick(province)}
          onMouseEnter={() => handleMouseEnter(province)} // Detecta hover
          onMouseLeave={handleMouseLeave} // Detecta salida del hover
        >
          {province === 'CABA' ? (
            <CabaSVG width="20" height="20" fill={color} /> // Aplica el color dinámico
          ) : (
            <NacionSVG width="150" height="90" fill={color} /> // Aplica el color dinámico
          )}
          <text x={province === 'CABA' ? 10 : 30} y={province === 'CABA' ? -5 : 105} className="special-province-text"  >
            {splitText(province === 'Nación' ? 'Poder Ejecutivo Nacional' : province).map(
              (line, index) => (
                <tspan key={index} x={province === 'CABA' ? -5 : 15} dy={index === 0 ? 0 : 12}>
                  {line}
                </tspan>
              )
            )}
          </text>
        </g>
      );
    });
  };
  

  if (!geoData) {
    return <div>Cargando mapa...</div>; // Muestra un mensaje mientras se cargan los datos
  }

  return (
    <div
      className="map-container"
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 720, // Ajusta la escala
          center: [-65, -38], // Centra el mapa en Argentina
        }}
        viewBox="220 40 400 600" // Ajusta los valores para expandir el área visible
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const provinceName = geo.properties.name; // Propiedad del nombre de la provincia
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleProvinceClick(provinceName)}
                  style={{
                    default: {
                      fill: getColor(provinceName), // Aplica el color dinámico
                      outline: "none",
                      stroke: "#fff", // Contorno de las provincias (blanco)
                      strokeWidth: 1, // Grosor del contorno
                    },
                    hover: {
                      fill: "#00A3E4", // Color al pasar el mouse
                      outline: "none",
                    },
                    pressed: {
                      fill: "#00A3E4", // Color al hacer clic
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Agregar las provincias especiales fuera del mapa */}
        {renderSpecialProvinces()}

      </ComposableMap>
    </div>
  );
};

MapComponent.propTypes = {
  selectedProvinces: PropTypes.arrayOf(
    PropTypes.shape({
      province: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      opacity: PropTypes.number,
      color: PropTypes.string
    })
  ),
  setSelectedProvince: PropTypes.func.isRequired,
  setSelectedProvinces: PropTypes.func.isRequired
};

export default MapComponent;
