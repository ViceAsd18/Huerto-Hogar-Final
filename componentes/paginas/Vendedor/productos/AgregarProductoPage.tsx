import { useState } from "react";
import VendedorLayout from "componentes/layout/VendedorLayout";
import FormularioProducto from "componentes/organismo/Vendedor/Productos/FormularioProducto";
import Titulo from "componentes/atomos/Titulo";
import { crearProducto } from "services/productos";
import { useNavigate } from "react-router";
import { message } from "antd";

const AgregarProductoPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);

            await crearProducto(values);

            message.success("Producto creado correctamente");

            navigate("/productos");
        } catch (error: any) {
            console.error("Error creando producto:", error);

            message.error(error?.response?.data?.mensaje || "Ocurrió un error al crear el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <VendedorLayout>
            <Titulo>Agregar Nuevo Producto</Titulo>

            <FormularioProducto
                modo="crear"
                onSubmit={handleSubmit}
                loading={loading}
            />
        </VendedorLayout>
    );
};

export default AgregarProductoPage;
