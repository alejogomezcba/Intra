import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"; 
import PropTypes from 'prop-types';

import { globalColors } from '../../utils/styles';

import './style.css';

const HeaderComponent = ({ setSelectedOption }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header-container">
      <div className="header-content">
        <h1 className='main-title' onClick={ () => location.reload()}>INTRA</h1>
        <button
          className="hamburger-menu"
          onClick={(e) => {
            e.stopPropagation(); // Previene que el clic en el botón cierre el menú
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <FontAwesomeIcon
            icon={!isMenuOpen ? faBars : faXmark}
            fontSize={20}
            color={!isMenuOpen ? globalColors.blue : globalColors.red}
            className="button-icon"
          />
        </button>
        <div
          className={`header-menu ${isMenuOpen ? 'header-menu--open' : ''}`}
          onClick={(e) => e.stopPropagation()} // Previene que el clic dentro del menú cierre el menú
        >
          <p
            className="header-option"
            onClick={() => {
              location.reload()
              setSelectedOption('home');
              setIsMenuOpen(false);
            }}
          >
            Inicio
          </p>
          <p
            className="header-option"
            onClick={() => {
              setSelectedOption('whatsintra');
              setIsMenuOpen(false);
            }}
          >
            Qué es el Intra
          </p>
          <p
            className="header-option"
            onClick={() => {
              setSelectedOption('whoweare');
              setIsMenuOpen(false);
            }}
          >
            Quiénes somos
          </p>
          <p
            className="header-option"
            onClick={() => {
              window.open(
                'https://indicetransparencia.ar/archivos/Guia_Metodologica.pdf',
                '_blank'
              );
            }}
          >
            Guía metodológica
          </p>
        </div>
      </div>
    </div>
  );
};

HeaderComponent.propTypes = {
  setSelectedOption: PropTypes.func.isRequired, // Función para actualizar la opción seleccionada en el menú
};


export default HeaderComponent;
