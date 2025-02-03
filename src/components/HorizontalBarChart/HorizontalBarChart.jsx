import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { valoresProvincias } from '../../../public/valoresProvincias';
import './style.css';
import { globalColors } from '../../utils/styles';
import ReferenceColorItems from '../ReferenceColorItems';

const HorizontalBarChart = () => {
  // Obtener los datos y ordenarlos
  const data = valoresProvincias
    .find((item) => item.key === 'rankingGeneral')
    .datos.sort((a, b) => b.value - a.value); // Ordenar de menor a mayor

  // Función para asignar colores según el valor
  const getBarColor = (value) => {
    if (value < 40) return globalColors.red; // Rojo
    if (value < 70) return globalColors.yellow; // Amarillo
    return globalColors.green; // Verde
  };

  return (
    <div className="barchart-container" >
      <h3>Ranking general 2024</h3>

      <ResponsiveContainer className="responsive-container" width="90%" height={500}>
        <BarChart data={data} layout="vertical" margin={{ top: 50, right: 40, left: 0, bottom: 20 }}>
          <XAxis type="number" />
          <YAxis
            dataKey="province"
            type="category"
            tick={{ fontSize: 12, fill: '#333', fontWeight: 'bold', width: 200 }}
            width={200}
            interval={0} // Muestra todos los ticks
          />
          <Tooltip />
          {/* Renderizado de las barras */}
          <Bar dataKey="value" barSize={20}>
            {/* Asignar colores individualmente usando <Cell> */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <ReferenceColorItems/>
    </div>
  );
};

export default HorizontalBarChart;
