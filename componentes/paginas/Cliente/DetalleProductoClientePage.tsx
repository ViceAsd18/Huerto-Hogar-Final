import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Spin, Result, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ClienteLayout from "../../layout/ClienteLayout";
import { getProductoById } from "../../../services/productos";
import type { Producto } from "../../../services/productos";
import FichaProducto from "componentes/organismo/Cliente/Tienda/FichaProducto";

const DetalleProductoClientePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) cargarProducto(Number(id));
    }, [id]);

    const cargarProducto = async (idProd: number) => {
        setLoading(true);
        setError(false);

        try {
            const data = await getProductoById(idProd);

            if (!data) {
                setError(true);
            } else {
                setProducto(data);
            }
        } catch (err) {
            console.error(err);
            setError(true);
            message.error("Error al cargar el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ClienteLayout>

            {/* LOADING */}
            {loading && (
                <div style={{ textAlign: "center", padding: 50 }}>
                    <Spin size="large" />
                </div>
            )}

            {/* ERROR / PRODUCTO NO ENCONTRADO */}
            {!loading && error && (
                <Result
                    status="404"
                    title="Producto no encontrado"
                    subTitle="El producto que buscas no existe o fue eliminado."
                    extra={
                        <Button
                            type="primary"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate("/cliente/tienda")}
                        >
                            Volver a la tienda
                        </Button>
                    }
                />
            )}

            {/* PRODUCTO */}
            {!loading && !error && producto && (
                <FichaProducto producto={producto} />
            )}

        </ClienteLayout>
    );
};

export default DetalleProductoClientePage;
