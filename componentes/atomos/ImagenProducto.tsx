import { Image } from "antd";

interface Props {
    src: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    style?: React.CSSProperties;
}

const Imagen = ({ src, alt = "Imagen", width = "100%", height = "100%", style }: Props) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{ borderRadius: 8, objectFit: "cover", ...style }}
            preview={false}
            fallback="https://via.placeholder.com/150?text=Sin+Imagen"
        />
    );
};

export default Imagen;
