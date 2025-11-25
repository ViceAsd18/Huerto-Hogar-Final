import { Image } from "antd";

interface Props {
    src : string;
    alt? : string;
}

const ImagenProducto = ({ src, alt = "Imagen del producto"} : Props) => {
    return (
        <Image
            src={src}
            alt={alt}
            style={{ width: "100%", height: "100%", borderRadius: 8, objectFit: "cover" }}
            preview={false}
            fallback="https://via.placeholder.com/150?text=Sin+Imagen"
        />
    )
}
    
export default ImagenProducto;