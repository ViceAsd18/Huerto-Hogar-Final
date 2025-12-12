import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import VendedorLayout from "componentes/layout/VendedorLayout";
import Titulo from "componentes/atomos/Titulo";
import FormularioProducto from "componentes/organismo/Vendedor/Productos/FormularioProducto";
import { getProductoById, editarProducto } from "services/productos";
import { message, Spin } from "antd";

const EditarProductoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true);
                const p = await getProductoById(Number(id));
                setProducto({
                    nombre_producto: p.nombre_producto,
                    descripcion_producto: p.descripcion_producto,
                    precio: p.precio,
                    stock: p.stock,
                    categoria: {
                        id_categoria: p.categoria.id_categoria
                    }
                });
            } catch (error) {
                console.error("Error cargando producto:", error);
                message.error("No se pudo cargar el producto");
            } finally {
                setLoadingData(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (values: any) => {
        const payload = {
            nombre_producto: values.nombre_producto,
            descripcion_producto: values.descripcion_producto,
            precio: values.precio,
            stock: values.stock,
            categoriaId: values.categoria
        };

        try {
            setLoading(true);
            await editarProducto(Number(id), payload);
            message.success("Producto actualizado correctamente");
            navigate("/productos");
        } catch (err: any) {
            console.error("Error al editar producto:", err);
            message.error(err?.response?.data?.mensaje || "Error al editar el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <VendedorLayout>
            <Titulo>Editar Producto</Titulo>

            {loadingData ? (
                <div style={{ textAlign: "center", marginTop: 50 }}>
                    <Spin size="large" />
                </div>
            ) : producto ? (
                <FormularioProducto
                    modo="editar"
                    productoInicial={producto}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
            ) : (
                <p>Producto no encontrado</p>
            )}
        </VendedorLayout>
    );
};

export default EditarProductoPage;
