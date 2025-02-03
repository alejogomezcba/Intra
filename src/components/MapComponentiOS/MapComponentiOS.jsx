import PropTypes from 'prop-types';

import './style.css';

//imagen por defecto
import mapaArgentina from '../../assets/mapa-argentina.png';  

const MapComponentiOS = ({ selectedFilter }) => {

  // Mapeo de valores a imágenes
  const imagesMap = {
    rankingGeneral: 'https://indicetransparencia.ar/archivos/14-RANKING-GENERAL.png',
    eticaPublica: 'https://indicetransparencia.ar/archivos/1-ETICA.png',
    grupoEtica: 'https://indicetransparencia.ar/archivos/15-GRUPO-ETICA.png',
    registrosDeGestionDeIntereses: 'https://indicetransparencia.ar/archivos/2-REGISTRO.png',
    declaracionesJuradas: 'https://indicetransparencia.ar/archivos/3-DECLARACIONES-JURADAS.png',
    accesoAlEmpleoPublico: 'https://indicetransparencia.ar/archivos/4-ACCESO-AL-EMPLEO-PUBLICO.png',
    nepotismo: 'https://indicetransparencia.ar/archivos/5-NEPOTISMO.png',
    corrupcion: 'https://indicetransparencia.ar/archivos/6-CORRUPCION.png',
    grupoAcceso: 'https://indicetransparencia.ar/archivos/16-GRUPO-ACCESO.png',
    boletinOficial: 'https://indicetransparencia.ar/archivos/7-BOLETIN.png',
    portalTransparencia: 'https://indicetransparencia.ar/archivos/8-PORTAL-DE-TRANSPARENCIA.png',
    accesoInformacion: 'https://indicetransparencia.ar/archivos/9-ACCESO-INFORMACION.png',
    relacionPrensa: 'https://indicetransparencia.ar/archivos/10-RELACION-CON-LA-PRENSA.png',
    grupoPresupuesto: 'https://indicetransparencia.ar/archivos/17-GRUPO-PRESUPUESTO.png',
    portalCompras: 'https://indicetransparencia.ar/archivos/11-PORTAL-DE-COMPRAS.png',
    pautaPublicitaria: 'https://indicetransparencia.ar/archivos/12-PAUTA-PUBLICITARIA.png',
    presupuesto: 'https://indicetransparencia.ar/archivos/13-PRESUPUESTO.png',
  };

  // Obtener la imagen correspondiente o usar imagen por defecto
  const imageSrc = imagesMap[selectedFilter?.value] || mapaArgentina;

  return (
    <div className="map-container-ios">
      <img className="map-image-ios" src={imageSrc} alt={selectedFilter?.label || "Mapa"} />
    </div>
  );
};

MapComponentiOS.propTypes = {
  selectedFilter: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
};


export default MapComponentiOS;
