import { List } from "antd";
import ItemOrdenCliente from "../../moleculas/Cliente/ItemOrdenCliente";
import type { Orden } from "services/orden";

const ListaOrdenesCliente = ({ ordenes }: { ordenes: Orden[] }) => {
    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={ordenes}
            locale={{ emptyText: "No tienes órdenes registradas" }}
            renderItem={(orden) => (
            <List.Item>
                <ItemOrdenCliente orden={orden} />
            </List.Item>
            )}
        />
    );
};

export default ListaOrdenesCliente;
