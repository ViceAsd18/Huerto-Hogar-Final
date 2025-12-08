import { Menu } from "antd";
import { useNavigate } from "react-router";
import { 
  DashboardOutlined, 
  ShoppingCartOutlined, 
  OrderedListOutlined, 
  UserSwitchOutlined,
  SwapOutlined
} from "@ant-design/icons";
import { useAuth } from "auth/AuthContext";

const MenuVendedor = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const items = [
      {
        key: "/dashboard",
        icon: <DashboardOutlined />,
        label: "Dashboard",
      },
      {
        key: "/productos",
        icon: <ShoppingCartOutlined />,
        label: "Productos",
      },
      {
        key: "/ordenes",
        icon: <OrderedListOutlined />,
        label: "Órdenes",
      },
    ];

    //SOLO PARA ADMIN → agregar Usuarios + Cambiar Vista
    if (user?.rol === "admin") {
      items.push(
        {
          key: "/usuarios",
          icon: <UserSwitchOutlined />,
          label: "Usuarios",
        },
        {
          key: "/",
          icon: <SwapOutlined />,
          label: "Cambiar vista", 
        }
      );
    }

    return (
      <Menu
        key={user?.rol} // fuerza render
        theme="dark"
        mode="inline"
        onClick={({ key }) => navigate(key)}
        items={items}
      />
    );
};

export default MenuVendedor;
