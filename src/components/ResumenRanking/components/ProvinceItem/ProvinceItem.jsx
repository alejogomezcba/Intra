import PropTypes from 'prop-types';

import './style.css'

import { globalColors } from '../../../../utils/styles';

const ProvinceItem = ({data}) => {

    const { province, value } = data;

  // Función para asignar colores según el valor
  const getBarColor = (value) => {
    if (value < 40) return globalColors.red; // Rojo
    if (value < 70) return globalColors.yellow; // Amarillo
    return globalColors.green; // Verde
  };

  return (
    <div className="item-container">
      <h3 className='province-name'>{province}</h3>
      <div className="content">
        {/* <p className="title">Transparencia</p> */}
        <p
            className="value"
            style={{ backgroundColor: getBarColor(Number(value)), color: getBarColor(Number(value)) ===  globalColors.yellow ? 'gray' : 'white'}}
        >
            {value}
        </p>
      </div>
    </div>
  )
};

ProvinceItem.propTypes = {
  data: PropTypes.shape({
    province: PropTypes.string.isRequired, // Nombre de la provincia
    value: PropTypes.number.isRequired,    // Valor asociado a la provincia
  }).isRequired, // Objeto con los datos de la provincia
};


export default ProvinceItem
