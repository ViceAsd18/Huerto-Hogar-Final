import { Tooltip } from "antd";

const contenedorStyle: React.CSSProperties = {
    backgroundColor: "rgba(46, 139, 87, 0.1)",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
};

interface IconoRedondoProps {
    title: string;
    onClick: () => void;
    icon: React.ReactNode;
}

const IconoRedondo = ({ title, onClick, icon }: IconoRedondoProps) => {
    return (
        <Tooltip title={title} overlayInnerStyle={{ fontSize: 12, padding: "4px 8px" }}>
            <div style={contenedorStyle} onClick={onClick}>
                {icon}
            </div>
        </Tooltip>
    );
};

export default IconoRedondo;
