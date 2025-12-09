import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Spin, Button, Result, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ClienteLayout from "../../layout/ClienteLayout";
import { getProductoById } from "../../../services/productos";
import type { Producto } from "../../../services/productos";
import InfoProductoCliente from "componentes/organismo/Cliente/InfoProductoCliente";
import Imagen from "componentes/atomos/Imagen";
import InfoProducto from "componentes/moleculas/Cliente/Tienda/InfoProducto";
import FichaProducto from "componentes/organismo/Cliente/Tienda/FichaProducto";



const DetalleProductoClientePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            cargarProducto(Number(id));
        }
    }, [id]);

    const cargarProducto = async (idProd: number) => {
        setLoading(true);
        try {
            const data = await getProductoById(idProd);
            if (data) {
                setProducto(data);
            } else {
                setProducto(null);
            }
        } catch (error) {
            console.error(error);
            message.error("Error al cargar el producto");
        } finally {
            setLoading(false);
        }
    };


    if (!producto){
        return <h1>Producto no encontrado</h1>
    }

    return (
        <ClienteLayout>
            <FichaProducto producto={producto} />
        </ClienteLayout>
    );
};

export default DetalleProductoClientePage;