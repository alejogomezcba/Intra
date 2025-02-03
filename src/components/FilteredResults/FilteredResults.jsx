import { useMemo } from "react";
import PropTypes from "prop-types";

//estilos
import './style.css'

//Components
import ReferenceColorItems from "../ReferenceColorItems";

const FilteredResults = ({ filterData }) => {

  // Ordenar los datos según el puntaje (descendente)
  const sortedData = useMemo(() => {
    if (!filterData?.datos) return [];
    return [...filterData.datos].sort((a, b) => b.value - a.value); // Ordenar por `value` de mayor a menor
  }, [filterData]);

  const { subTitulo } = filterData;

  return (
    <div style={{ margin: "20px 0",width: '100%', maxWidth: 450 }}>
      {/* Contenedor con borde y esquinas redondeadas */}
      {subTitulo && <h3 style={{ marginBottom: 10 }}>{subTitulo}</h3>}
      <div
        style={{
          border: "1px solid #ccc", // Borde general
          borderRadius: "6px", // Esquinas redondeadas
          overflow: "hidden", // Asegura que las esquinas redondeadas funcionen
          width: '100%'
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
              <th style={{ padding: "3px", borderBottom: "2px solid #ccc", fontSize: '1rem', color: '#595959' }}>Ranking</th>
              <th style={{ padding: "3px", borderBottom: "2px solid #ccc", fontSize: '1rem', color: '#595959' }}>Distrito</th>
              <th style={{ padding: "3px", borderBottom: "2px solid #ccc", fontSize: '1rem', color: '#595959' }}>Índice</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
               const provinceName = item.province === 'Nacion' ? 'Poder Ejecutivo Nacional' : item.province
              return ( <tr key={item.province} style={{ textAlign: "center" }}>
                <td style={{ padding: "3px", borderBottom: "1px solid #ccc", fontSize: '0.8rem', color: '#595959' }}>{index + 1}</td>
                <td style={{ padding: "3px", borderBottom: "1px solid #ccc", fontSize: '0.8rem', color: '#595959', textTransform: 'uppercase' }}>{provinceName}</td>
                <td style={{ padding: "3px", borderBottom: "1px solid #ccc", fontSize: '0.8rem', color: '#595959' }}>{item.value}</td>
              </tr>)
            })}
          </tbody>
        </table>


      </div>
      <ReferenceColorItems/>

    </div>
  );
};

FilteredResults.propTypes = {
  filterData: PropTypes.shape({
    datos: PropTypes.arrayOf(
      PropTypes.shape({
        province: PropTypes.string.isRequired, // Nombre de la provincia
        value: PropTypes.number.isRequired,   // Índice del valor
      })
    ),
  }),
};


export default FilteredResults;
