import React from "react";
import Imagen from "componentes/atomos/Imagen";

interface Props {
  src: string;
  alt: string;
}

const smallImageStyle: React.CSSProperties = {
    gridColumn: "span 2",
    gridRow: "span 2",
    borderRadius: 10,
    overflow: "hidden",
    minHeight: 100,
    minWidth: 100,  
};

const ImgGaleria = ({src, alt} : Props) => (
    <div className="small" style={smallImageStyle}>
        <Imagen src={src} alt={alt} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
    </div>
);

export default ImgGaleria;
