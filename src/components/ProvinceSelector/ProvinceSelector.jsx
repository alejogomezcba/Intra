import { useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

import './style.css';
import { globalColors } from '../../utils/styles';
import { selectProvinceOptions } from './selectProvinceOptions';

const ProvinceSelector = ({ setSelectedProvince, selectedProvince, initialValue }) => {
  // Encuentra la opción inicial basada en el value
  const initialOption = selectProvinceOptions.find(option => option.value === initialValue);

  const customStyles = {
    option: (base, { isSelected }) => ({
      ...base,
      paddingLeft: isSelected ? '20px' : '10px', // Mayor desplazamiento para la opción seleccionada
      backgroundColor: isSelected ? globalColors.blue : base.backgroundColor, // Cambia el fondo de la opción seleccionada
      color: isSelected ? 'white' : globalColors.grayTwo, // Cambia el color del texto si está seleccionada
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

  // Cuando se monte el componente, setea el valor inicial en el estado seleccionado
  useEffect(() => {
    if (initialOption) {
      setSelectedProvince(initialOption); // Guarda el objeto completo en el estado
    }
  }, [initialOption, setSelectedProvince]);

  return (
    <div className="custom-selector" style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
      <FontAwesomeIcon
        icon={faLayerGroup}
        fontSize={20}
        color={globalColors.grayTwo}
        style={{ position: 'absolute', top: 8, left: 10, zIndex: 10000 }}
      />
      <Select
        options={selectProvinceOptions}
        value={selectedProvince} // Aquí pasa el objeto seleccionado
        onChange={(selectedOption) => {
          setSelectedProvince(selectedOption); // Guarda el objeto completo en el estado
        }}
        placeholder="Selecciona una Provincia..."
        isSearchable // Habilita el buscador
        styles={customStyles} // Aplicar estilos personalizados
      />
    </div>
  );
};

ProvinceSelector.propTypes = {
  setSelectedProvince: PropTypes.func.isRequired, // Función para actualizar el estado del valor seleccionado
  selectedProvince: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }), // Objeto con 'value' y 'label' para la provincia seleccionada
  initialValue: PropTypes.string, // Valor inicial para seleccionar una provincia
};


export default ProvinceSelector;
