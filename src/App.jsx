import { useEffect, useState } from 'react'

import './App.css'
import { valoresProvincias } from '../public/valoresProvincias'

import HeaderComponent from './components/HeaderComonent'
import Filters from './components/Filters/Filters'
import ResumenRanking from './components/ResumenRanking'
import MapComponent from './components/MapComponent';
import FilteredResults from './components/FilteredResults/FilteredResults';
import FilteredDataProvince from './components/FilteredDataProvince/FilteredDataProvince';
import HorizontalBarChart from './components/HorizontalBarChart'

import WhoWeAre from './components/WhoWeAre/WhoWeAre';
import WhatsIntra from './components/WhatsIntra/WhatsIntra';
import Footer from './components/Footer'
import MapComponentiOS from './components/MapComponentiOS'
import ProvinceSelector from './components/ProvinceSelector/ProvinceSelector'
import { globalColors } from './utils/styles'

const App = () => {

    const [selectedProvince, setSelectedProvince] = useState();
    const [filteredData, setFilteredData] = useState([]);
    const [selectedProvinces, setSelectedProvinces] = useState();
    const [selectedFilter, setSelectedFilter] = useState('rankingGeneral')

    const [selectedOption, setSelectedOption] = useState('home');

    const isIphone = /iPhone/i.test(navigator.userAgent);
    const isSafari = /^((?!CriOS|FxiOS).)*Safari/i.test(navigator.userAgent);
    const isIphoneSafari = isIphone && isSafari;

    const getProvinceColor = (value) => {
        if (value >= 0 && value <= 39.9) {
          return "rojo";
        } else if (value >= 40 && value <= 69.99) {
          return "amarillo";
        } else if (value >= 70) {
          return "verde";
        } else {
          return "indefinido"; // Para manejar valores fuera del rango esperado.
        }
      }

      // Maneja el cambio en el filtro
    const handleFilterChange = (event, valueKey) => {
        const key = valueKey ? valueKey : event.value; // Obtiene el valor del filtro seleccionado
        // Filtra los datos basados en el filtro seleccionado
        const filtered = valoresProvincias.find((item) => item.key === key);
        setFilteredData(filtered)
        if (filtered) {
        const coloredData = filtered.datos.map((province) => ({
            ...province,
            color: getProvinceColor(province.value), // Calcula el color
        }));
        setSelectedProvinces(coloredData);
        }
    };

  const mapProps = {
    setSelectedProvinces,
    selectedProvinces: selectedProvinces,
    setSelectedProvince,
    filteredData,
    setSelectedFilter
  }

  
  const filtersProps = {
    handleFilterChange,
    selectedFilter,
    setSelectedFilter,
    setSelectedProvince,
    initialValue: 'rankingGeneral'
  }

  const provSelProps = {
    setSelectedProvince,
    selectedProvince,
    isIphoneSafari,
    initialValue: 'Nacion'
  }

  useEffect(() => {
    handleFilterChange( null , 'rankingGeneral')
  }, [])
  

  return (
    <div className='app-container'>
      <HeaderComponent selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      { selectedOption === 'home' && 
        <>
          <div className='app-title-container'>
              <h3>Índice Nacional de Transparencia - Poderes ejecutivos provinciales (Argentina)</h3>
              <h4 style={{ color: '#797979' }}> Relevamiento de 13 indicadores formados por 58 variables sobre normativas y nivel de accesibilidad </h4>
          </div>
          <ResumenRanking />
          <div className='section-two'>
            <div style={{ display: 'flex', flexDirection: 'column', width: '92%', maxWidth: '500px', alignItems:'center' }}>
              <Filters  {...filtersProps}/>
              { selectedFilter && <FilteredResults  filterData={filteredData} />} 
            </div>
            {isIphoneSafari ? <MapComponentiOS selectedFilter={selectedFilter} /> : <MapComponent {...mapProps} />}
            <div style={{ display: 'flex', flexDirection: 'column', width: '92%', maxWidth: '500px', alignItems:'center'}}>
              {isIphoneSafari && <ProvinceSelector {...provSelProps}/>}
              {selectedProvince  && <FilteredDataProvince valoresProvincias={valoresProvincias} selectedProvince={selectedProvince} />}
            </div>
            </div>
        </>
      }
      { selectedOption === 'whoweare' && <WhoWeAre/> }
      { selectedOption === 'whatsintra' && <WhatsIntra/> }
      { selectedOption === 'home' && <HorizontalBarChart/>}
      <Footer />
    </div>

  )
}

export default App