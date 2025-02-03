# Informe Argentina

* Para poder cambiar los datos del "Resumen del Ranking general", hay que editar el archivo dataSlides.jsx que se encuentra dentro de la carpeta src/components/ResumenRanking.
* Los colores del mapa y de los valores, se pueden modificar desde el archivo styles.jsx dentro de la carpeta src/utils, el valor de los colores debe ser en HEX, ejemplo #f2f2f2.
* Para editar el valor/puntaje de las provincias, se puede hacer usando el archivo valoresProvincias.jsx dentro de la carpeta public. De igual forma si hay que agregar mas, deben seguir el siguiente formato
    {
        titulo: "ALGUN TITULO",
        key: "algunTitulo",
        id: 1,
        datos: [
            { province: "Provincia", value: 11.11, opacity: 22.22 },
        ],
    }
Una vez agregado, para que aparezco en el filtro, para poder ser seleccionado, hay que agregarlo en el archivo selectOptions.jsx ubicado en src/components/Filters, con el siguiente formato
  { 
    label: "Nombre Label",
    value: "nombreLabel",
    id: 1
  }