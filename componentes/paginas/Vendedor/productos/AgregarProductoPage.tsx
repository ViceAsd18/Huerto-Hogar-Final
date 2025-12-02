import VendedorLayout from "componentes/layout/VendedorLayout";
import FormularioProducto from "componentes/organismo/Vendedor/FormularioProducto";
import Titulo from "componentes/atomos/Titulo";
import { crearProducto } from "services/productos";
import { useNavigate } from "react-router";

const AgregarProductoPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        await crearProducto(values);
        navigate("/productos");
    };

    return (
      <VendedorLayout>
        <Titulo>Agregar Nuevo Producto</Titulo>

        <FormularioProducto
          modo="crear"
          onSubmit={handleSubmit}
        />
      </VendedorLayout>
    );
};

export default AgregarProductoPage;
