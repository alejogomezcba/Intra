import { useMemo } from "react";
import PropTypes from "prop-types";

import './style.css'


const linkBUENOS_AIRES = "https://indicetransparencia.ar/archivos/planillas/01_BUENOS_AIRES.pdf";
const linkCABA = "https://indicetransparencia.ar/archivos/planillas/02_CABA.pdf";
const linkCATAMARCA = "https://indicetransparencia.ar/archivos/planillas/03_CATAMARCA.pdf";
const linkCHACO = "https://indicetransparencia.ar/archivos/planillas/04_CHACO.pdf";
const linkCHUBUT = "https://indicetransparencia.ar/archivos/planillas/05_CHUBUT.pdf";
const linkCORDOBA = "https://indicetransparencia.ar/archivos/planillas/06_CORDOBA.pdf";
const linkCORRIENTES = "https://indicetransparencia.ar/archivos/planillas/07_CORRIENTES.pdf";
const linkENTRE_RIOS = "https://indicetransparencia.ar/archivos/planillas/08_ENTRE_RIOS.pdf";
const linkFORMOSA = "https://indicetransparencia.ar/archivos/planillas/09_FORMOSA.pdf";
const linkJUJUY = "https://indicetransparencia.ar/archivos/planillas/10_JUJUY.pdf";
const linkLA_PAMPA = "https://indicetransparencia.ar/archivos/planillas/11_LA_PAMPA.pdf";
const linkLA_RIOJA = "https://indicetransparencia.ar/archivos/planillas/12_LA_RIOJA.pdf";
const linkMENDOZA = "https://indicetransparencia.ar/archivos/planillas/13_MENDOZA.pdf";
const linkMISIONES = "https://indicetransparencia.ar/archivos/planillas/14_MISIONES.pdf";
const linkNEUQUEN = "https://indicetransparencia.ar/archivos/planillas/15_NEUQUEN.pdf";
const linkRIO_NEGRO = "https://indicetransparencia.ar/archivos/planillas/16_RIO_NEGRO.pdf";
const linkSALTA = "https://indicetransparencia.ar/archivos/planillas/17_SALTA.pdf";
const linkSAN_LUIS = "https://indicetransparencia.ar/archivos/planillas/18_SAN_LUIS.pdf";
const linkSAN_JUAN = "https://indicetransparencia.ar/archivos/planillas/19_SAN_JUAN.pdf";
const linkSANTA_CRUZ = "https://indicetransparencia.ar/archivos/planillas/20_SANTA_CRUZ.pdf";
const linkSANTA_FE = "https://indicetransparencia.ar/archivos/planillas/21_SANTA_FE.pdf";
const linkSANTIAGO = "https://indicetransparencia.ar/archivos/planillas/22_SANTIAGO.pdf";
const linkTIERRA_DEL_FUEGO = "https://indicetransparencia.ar/archivos/planillas/23_TIERRA_DEL_FUEGO.pdf";
const linkTUCUMAN = "https://indicetransparencia.ar/archivos/planillas/24_TUCUMAN.pdf";
const linkNACION = "https://indicetransparencia.ar/archivos/planillas/25_NACION.pdf";



const FilteredDataProvince = ({ valoresProvincias, selectedProvince }) => {

    // Mapeo de links
    const linkMap = {
      "Buenos Aires": linkBUENOS_AIRES,
      "CABA": linkCABA,
      "Catamarca": linkCATAMARCA,
      "Chaco": linkCHACO,
      "Chubut": linkCHUBUT,
      "Cordoba": linkCORDOBA,
      "Corrientes": linkCORRIENTES,
      "Entre Rios": linkENTRE_RIOS,
      "Formosa": linkFORMOSA,
      "Jujuy": linkJUJUY,
      "La Pampa": linkLA_PAMPA,
      "La Rioja": linkLA_RIOJA,
      "Mendoza": linkMENDOZA,
      "Misiones": linkMISIONES,
      "Neuquen": linkNEUQUEN,
      "Rio Negro": linkRIO_NEGRO,
      "Salta": linkSALTA,
      "San Luis": linkSAN_LUIS,
      "San Juan": linkSAN_JUAN,
      "Santa Cruz": linkSANTA_CRUZ,
      "Santa Fe": linkSANTA_FE,
      "Santiago del Estero": linkSANTIAGO,
      "Tierra del Fuego": linkTIERRA_DEL_FUEGO,
      "Tucuman": linkTUCUMAN,
      "Nacion": linkNACION,
};  

  const provinciaSeleccionada = selectedProvince.value ? selectedProvince.value : selectedProvince;

  const removeAccents = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Filtrar y obtener los datos relevantes de la provincia seleccionada
  const filteredResults = useMemo(() => {
    if (!provinciaSeleccionada || !valoresProvincias.length) return [];
  
    // Excluir objetos que tengan "grupo" en su título
    const valoresFiltrados = valoresProvincias.filter(filtro => {
      const titulo = filtro.titulo?.toLowerCase() || "";
      return !titulo.includes("grupo");
    });
  
    // Procesar los datos de los valores filtrados
    const results = valoresFiltrados.map(filtro => {
      const provinceData = filtro.datos.find(item => {
        const normalizedProvince = removeAccents(item.province);
        const normalizedSelected = removeAccents(provinciaSeleccionada);
        return normalizedProvince === normalizedSelected;
      });
  
      if (provinceData) {
        const sortedData = [...filtro.datos].sort((a, b) => b.value - a.value); // Ordenar por el valor
        const ranking = sortedData.findIndex(item => {
          const normalizedProvince = removeAccents(item.province);
          const normalizedSelected = removeAccents(provinciaSeleccionada);
          return normalizedProvince === normalizedSelected;
        }) + 1; // Obtener ranking
  
        return {
          titulo: filtro.titulo, // Título del filtro
          provincia: provinciaSeleccionada, // Provincia seleccionada
          valor: provinceData.value, // Valor de la provincia seleccionada
          ranking, // Ranking dentro del filtro
        };
      }
      return null; // Si no se encuentra la provincia, devolver null
    }).filter(result => result !== null); // Filtrar solo los resultados válidos
  
    // Mover "RANKING GENERAL" al inicio (si lo necesitas)
    return results.sort((a, b) => {
      if (a.titulo === "RANKING GENERAL") return -1;
      if (b.titulo === "RANKING GENERAL") return 1;
      return 0;
    });
  }, [provinciaSeleccionada, valoresProvincias]);
  
  
  //const provinceName = provinciaSeleccionada === 'Nacion' ? 'Poder Ejecutivo Nacional': provinciaSeleccionada

  const provinceName = provinciaSeleccionada === 'Nacion' ? 'Poder Ejecutivo Nacional' : provinciaSeleccionada === 'CABA' ? "Ciudad Autónoma de Buenos Aires" : provinciaSeleccionada;


  const documentLink = linkMap[removeAccents(provinciaSeleccionada)];

  return (
    <div style={{ overflowX: "auto", margin: "20px 0", width: '100%', maxWidth: '500px' }}>
        <h3 style={{ textAlign: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '20px 0' }}>{provinceName}</h3>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            
            <tr style={{ background: "#f4f4f4", textAlign: "center" }}>
              <th
                style={{
                  padding: "4px",
                  borderBottom: "2px solid #ccc",
                  fontSize: "1rem",
                  color: "#595959",
                }}
              >
                Ranking
              </th>
              <th
                style={{
                  padding: "4px",
                  borderBottom: "2px solid #ccc",
                  fontSize: "1rem",
                  color: "#595959",
                }}
              >
                Título
              </th>
              <th
                style={{
                  padding: "4px",
                  borderBottom: "2px solid #ccc",
                  fontSize: "1rem",
                  color: "#595959",
                }}
              >
                Índice
              </th>

            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td
                  style={{
                    padding: "3px",
                    borderBottom: "1px solid #ccc",
                    fontSize: "0.8rem",
                    color: "#595959",
                  }}
                >
                  {result.ranking}
                </td>
                <td
                  style={{
                    padding: "3px",
                    borderBottom: "1px solid #ccc",
                    fontSize: "0.8rem",
                    color: "#595959",
                    textTransform: 'uppercase'
                  }}
                >
                  {result.titulo}
                </td>
                <td
                  style={{
                    padding: "3px",
                    borderBottom: "1px solid #ccc",
                    fontSize: "0.8rem",
                    color: "#595959",
                  }}
                >
                  {result.valor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn-download" onClick={ ()=> {
        window.open(documentLink, '_blank')
      }}>
        Descargar tabla con información</button>
    </div>
  );
};

// Validación de las propiedades
FilteredDataProvince.propTypes = {
  valoresProvincias: PropTypes.arrayOf(PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    datos: PropTypes.arrayOf(PropTypes.shape({
      province: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  selectedProvince: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

export default FilteredDataProvince;
