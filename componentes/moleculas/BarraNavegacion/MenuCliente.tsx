import { Menu } from "antd";
import { useNavigate } from "react-router";
import { HomeOutlined, ShopOutlined, ReadOutlined, InfoCircleOutlined, PhoneOutlined } from "@ant-design/icons";

const MenuCliente = () => {
    const navigate = useNavigate();

    return (
        <Menu
        mode="horizontal"
        onClick={({ key }) => navigate(key)}
        items={[
            { key: "/cliente/home_cliente", label: "Inicio", icon: <HomeOutlined /> },
            { key: "/cliente/tienda", label: "Tienda", icon: <ShopOutlined /> },
            { key: "/cliente/nosotros", label: "Nosotros", icon: <InfoCircleOutlined /> },
            { key: "/cliente/blogs", label: "Blogs", icon: <ReadOutlined /> },
            { key: "/cliente/contacto", label: "Contacto", icon: <PhoneOutlined /> },
        ]}
        />
    );
};

export default MenuCliente;
