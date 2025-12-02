import { Button } from "antd";

interface Props {
    children : React.ReactNode;
    onClick?: (e : React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
    color? : string;
}

const Boton = ({ children, onClick, style, color }: Props) => {
    return (
        <Button onClick={onClick} style={{ ...style, backgroundColor: color, color : 'white'}} >
            {children}
        </Button>
    )
}

export default Boton;