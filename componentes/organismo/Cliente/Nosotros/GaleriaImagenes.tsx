import React from "react";
import Imagen from "componentes/atomos/Imagen";
import Titulo from "componentes/atomos/Titulo";
import ImgGaleria from "componentes/moleculas/Cliente/Nosotros/ImgGaleria";

const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: "1%",
    width: "100%",
    margin: "0 auto",
    backgroundColor: "#FAFAFA",
    borderRadius: "12px",
};

const bigImageStyle: React.CSSProperties = {
    gridColumn: "span 4",
    gridRow: "span 4",
    borderRadius: "12px",
    overflow: "hidden",
    minHeight: 260,
    minWidth: 260,
};

const rutaImg = "/assets/img/nosotros/galeria/";

const GaleriaImagenes: React.FC = () => {
    return (
        <div style={{ backgroundColor: "#FAFAFA", padding: "40px 0" }}>
            <Titulo variante="titulo" nivel={2} style={{ textAlign: "center", marginBottom : 20 }}>
                El Corazón de HuertoHogar
            </Titulo>

            <div className="galeria-imagenes" style={gridStyle}>
                <div className="big" style={bigImageStyle}>
                <Imagen
                    src={rutaImg + "principal.png"}
                    alt="Imagen grande"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                </div>

                {/* Imágenes pequeñas*/}
                <ImgGaleria src={rutaImg + "1.jpg"} alt="Pequeña 1" />
                <ImgGaleria src={rutaImg + "2.jpg"} alt="Pequeña 2" />
                <ImgGaleria src={rutaImg + "3.jpg"} alt="Pequeña 3" />
                <ImgGaleria src={rutaImg + "4.png"} alt="Pequeña 4" />
                <ImgGaleria src={rutaImg + "5.jpg"} alt="Pequeña 5" />
                <ImgGaleria src={rutaImg + "6.jpg"} alt="Pequeña 6" />
                <ImgGaleria src={rutaImg + "7.png"} alt="Pequeña 7" />
                <ImgGaleria src={rutaImg + "8.png"} alt="Pequeña 8" />
            </div>
        </div>
    );
};

export default GaleriaImagenes;
