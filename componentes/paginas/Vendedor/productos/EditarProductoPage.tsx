import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import VendedorLayout from "componentes/layout/VendedorLayout";
import Titulo from "componentes/atomos/Titulo";
import FormularioProducto from "componentes/organismo/Vendedor/FormularioProducto";
import { getProductoById, editarProducto } from "services/productos";
import { message } from "antd";

const EditarProductoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
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

        console.log("Payload para editar producto:", payload);

        try {
            await editarProducto(Number(id), payload);
            message.success("Producto actualizado correctamente");
            navigate("/productos");
        } catch (err) {
            console.error("Error al editar producto:", err);
            message.error("Error al editar el producto");
        }
    };


    return (
        <VendedorLayout>
        <Titulo>Editar Producto</Titulo>

        {producto && (
            <FormularioProducto
            modo="editar"
            productoInicial={producto}
            onSubmit={handleSubmit}
            />
        )}
        </VendedorLayout>
    );
};

export default EditarProductoPage;
