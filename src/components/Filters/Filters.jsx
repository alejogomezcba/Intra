import { useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip'; // Importar Tooltip
import 'react-tooltip/dist/react-tooltip.css'; // Importar CSS para estilos predeterminados

import './style.css';
import { globalColors } from '../../utils/styles';
import { selectOptions } from './selectOptions';

const Filters = ({ handleFilterChange, selectedFilter, setSelectedFilter, setSelectedProvince, initialValue }) => {
  // Encuentra la opción inicial basada en el value
  const initialOption = selectOptions.find(option => option.value === initialValue);

  // Cuando se monte el componente, setea el valor inicial en el estado seleccionado
  useEffect(() => {
    if (initialOption) {
      setSelectedFilter(initialOption);
    }
  }, [initialOption, setSelectedFilter]);

  const customStyles = {
    option: (base, { isSelected }) => ({
      ...base,
      paddingLeft: isSelected ? '20px' : '10px', // Mayor desplazamiento para la opción seleccionada
      backgroundColor: isSelected ? globalColors.blue : base.backgroundColor, // Cambia el fondo de la opción seleccionada
      color: isSelected ? 'white' : globalColors.grayTwo, // Cambia el color del texto si está seleccionada
      textTransform: 'uppercase',
    }),
    singleValue: (base) => ({
      ...base,
      paddingLeft: '40px', // Desplazamiento en el input del select
    }),
    input: (base) => ({
      ...base,
      padding: '0 0 0 30px', // Agrega padding al texto ingresado en el input
    }),
    control: (base) => ({
      ...base,
      paddingLeft: '30px', // Desplazamiento para todo el control
      minHeight: '40px', // Altura mínima para mantener consistencia
    }),
  };

  return (
    <div style={{ width: '100%', maxWidth: '450px', position: 'relative' }}
      data-tooltip-id="category-tooltip" // Asociar tooltip por ID
      data-tooltip-content="Elije el tipo de reporte a visualizar." // Contenido del tooltip
    >
      {/* Icono con Tooltip */}
      <FontAwesomeIcon
        icon={faLayerGroup}
        fontSize={20}
        color={globalColors.grayTwo}
        style={{ position: 'absolute', top: 8, left: 10, zIndex: 10000 }}
        />
      <Tooltip
        id="category-tooltip"
        place="top"
        effect="solid"
        style={{ backgroundColor: '#d96233', color: 'white', borderRadius: '5px' }}
      /> {/* Tooltip */}
      {/* Select */}
      <Select
        options={selectOptions}
        value={selectedFilter}
        onChange={(event) => {
          setSelectedFilter(event);
          handleFilterChange(event);
          setSelectedProvince(null);
        }}
        placeholder="Selecciona una categoría..."
        isSearchable // Habilita el buscador
        styles={customStyles} // Aplicar estilos personalizados
      />
    </div>
  );
};

Filters.propTypes = {
  handleFilterChange: PropTypes.func.isRequired, // Función para manejar el cambio del filtro seleccionado
  selectedFilter: PropTypes.shape({
    value: PropTypes.string.isRequired, // Valor de la opción seleccionada
    label: PropTypes.string.isRequired, // Etiqueta visible de la opción seleccionada
  }), // Filtro actualmente seleccionado
  setSelectedFilter: PropTypes.func.isRequired, // Función para actualizar el filtro seleccionado
  setSelectedProvince: PropTypes.func.isRequired, // Función para actualizar la provincia seleccionada
  initialValue: PropTypes.string, // Valor inicial para determinar la opción preseleccionada
};

export default Filters;
