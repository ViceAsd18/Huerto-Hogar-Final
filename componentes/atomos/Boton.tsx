import { Button } from "antd";

interface Props {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
    color?: string;
    htmlType?: "button" | "submit" | "reset";
}

const Boton = ({ children, onClick, style, color, htmlType = "button" }: Props) => {
    
    const finalStyle = {
        ...style,
        ...(color && { backgroundColor: color }),
        color: "white",
    };
    
    return (
        <Button
            onClick={onClick}
            htmlType={htmlType}
            style={finalStyle}
        >
            {children}
        </Button>
    );
};

export default Boton;
