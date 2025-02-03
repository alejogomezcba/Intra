import { useState } from 'react';
import ProvinceItem from './components/ProvinceItem/ProvinceItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Data
import { valoresProvincias } from '../../../public/valoresProvincias';

// Estilos
import { globalColors } from '../../utils/styles';
import './style.css';

const ResumenRanking = () => {
  // Obtener los datos, ordenarlos y dividirlos en grupos
  const data = valoresProvincias
    .find((item) => item.key === 'rankingGeneral').datos;

  // Ordenar los datos desde el mayor puntaje al menor puntaje
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Función para dividir los datos en grupos de 3
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Dividir los datos en grupos de 3
  const lists = chunkArray(sortedData, 3);

  const [currentListIndex, setCurrentListIndex] = useState(0);

  const handlePrevious = () => {
    if (currentListIndex > 0) {
      setCurrentListIndex(currentListIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentListIndex < lists.length - 1) {
      setCurrentListIndex(currentListIndex + 1);
    }
  };

  return (
    <div className='component-container'>
      <div className="resumen-container">
        <button
          onClick={handlePrevious}
          disabled={currentListIndex === 0}
          className='scroll-btn'
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            fontSize={20}
            color={currentListIndex === 0 ? globalColors.gray : globalColors.green}
            className='button-icon'
          />
        </button>
        <div className="resumen-content">
          <h3 className='resumen-title'>Resumen del ranking general</h3>
          <div className='content-items'>
            {lists[currentListIndex].map((item) => (
              <ProvinceItem key={item.province} data={item} />
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          disabled={currentListIndex === lists.length - 1}
          className='scroll-btn'
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            fontSize={20}
            color={currentListIndex === lists.length - 1 ? globalColors.gray : globalColors.green}
            className='button-icon'
          />
        </button>
      </div>
    </div>
  );
};

export default ResumenRanking;
