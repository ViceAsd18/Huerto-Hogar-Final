import { Typography } from "antd";

const { Text } = Typography;

interface Props {
    children: React.ReactNode;
    type?: "secondary" | "warning" | "success" | "danger";
    strong?: boolean;
    style?: React.CSSProperties;
}

const Texto = ({ children, type, strong = false, style }: Props) => {
    return (
        <Text type={type} strong={strong} style={style}>
            {children}
        </Text>
    );
};

export default Texto;
