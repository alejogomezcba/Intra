import './style.css'

import logoOne from '../../assets/poderCiudadano.webp';
import logoTwo from '../../assets/federalismo.webp';
import logoThree from '../../assets/fundacion.webp';
import logoFour from '../../assets/ruido.webp';

const Footer = () => {
  return (
    <div className='footer-section' >
        <div className="footer-content">
            <h3 className='footer-title'>Índice elaborado por: </h3>
            <div className='image-container'>
                <img className="image-item" src={logoOne} alt="Logo Poder Ciudadano" />
                <img className="image-item" src={logoTwo} alt="Logo Federalismo" />
                <img className="image-item" src={logoThree} alt="Logo Fundación" />
                <img className="image-item" src={logoFour} alt="Logo Ruido" />
            </div>
        </div>

    </div>
  );
};

export default Footer;
