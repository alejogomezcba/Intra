import { globalColors } from "../../utils/styles"

//estilos
import './style.css'

const ReferenceColorItems = () => {

    const referenceItems = [
        {
          text: 'Alta Transparencia',
          color: globalColors.green,
          key: 1
        },
        {
          text: 'Transparencia Moderada',
          color: globalColors.yellow,
          key: 2
        },
        {
          text: 'Transparencia Insuficiente',
          color: globalColors.red,
          key: 3
        }
      ]  

  return (
    <div className="reference-container" >
        {referenceItems.map( (item) =>
            <div className="reference-item" key={item.key}>
                <span className="reference-color" style={{ backgroundColor: item.color }}/>
                <p className="reference-text" >{item.text}</p>
            </div>
        )}
    </div>
  )
}

export default ReferenceColorItems
