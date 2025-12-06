import React from "react";
import Imagen from "componentes/atomos/Imagen";
import Titulo from "componentes/atomos/Titulo";

const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: "20px",
    width: "100%",
    margin: "0 auto",
    backgroundColor: "#FAFAFA",
    borderRadius: "12px",
    border : '2px solid red'
};

const bigImageStyle: React.CSSProperties = {
    gridColumn: "span 4",
    gridRow: "span 4",
    borderRadius: "12px",
    overflow: "hidden",
    border : '2px solid blue',
    minHeight : 300,
    minWidth : 300
};

const smallImageStyle: React.CSSProperties = {
    gridColumn: "span 2",
    gridRow: "span 2",
    borderRadius: "10px",
    overflow: "hidden",
    border : '2px solid green',
    minHeight : 140,
    minWidth : 140
};

const rutaImg = '/assets/img/nosotros/galeria/'

const GaleriaImagenes = () => {
    return (
        <div style={{ backgroundColor: "#FAFAFA", padding: "40px 0" }}>
            
            <Titulo nivel={2} style={{textAlign : 'center'}}>El Corazón de HuertoHogar</Titulo>

            <div style={gridStyle} className="galeria-imagenes">
                
                <div style={bigImageStyle}>
                    <Imagen src={rutaImg + "/principal.png"} alt="Imagen grande" style={{objectFit : 'contain'}}/>
                </div>


                {/* Imágenes pequeñas (derecha) */}

                <div style={smallImageStyle}>
                    <Imagen src={rutaImg + "/1.jpg"} alt="Pequeña 1" />
                </div>

                <div style={smallImageStyle}>
                    <Imagen src={rutaImg + "/2.jpg"} alt="Pequeña 2" />
                </div>

                <div style={smallImageStyle}>
                    <Imagen src={rutaImg + "/3.jpg"} alt="Pequeña 3" />
                </div>

                <div style={smallImageStyle}>
                    <Imagen src={rutaImg + "/4.png"} alt="Pequeña 4" />
                </div>

                <div style={smallImageStyle}>
                    <Imagen src={rutaImg + "/5.jpg"} alt="Pequeña 5" />
                </div>

                <div style={smallImageStyle}>
                    <Imagen src={rutaImg + "/6.jpg"} alt="Pequeña 6" />
                </div>

                <div style={smallImageStyle}>
                    <Imagen src={rutaImg + "/7.png"} alt="Pequeña 7" />
                </div>
        
                <div style={smallImageStyle}>
                    <Imagen src={rutaImg + "/8.png"} alt="Pequeña 8" />
                </div>


            </div>
        </div>
    );
};

export default GaleriaImagenes;