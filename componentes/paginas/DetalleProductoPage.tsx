import VendedorLayout from "componentes/layout/VendedorLayout"
import { productosMock } from "modelo/productoModel";
import { useParams } from "react-router";
import CardInfoProducto from "componentes/moleculas/CardInfoProducto";

const DetalleProductoPage = () => {

    const { id } = useParams<{ id: string }>();
    const proudctoEncontardo = productosMock.find(
        (producto) => producto.id === Number(id)
    )

    if (!proudctoEncontardo){
        return (
            <VendedorLayout>
                <h1>Producto No Encontrado</h1>
            </VendedorLayout>
        )
    }

    return (
        <VendedorLayout>
            <h1> ID Producto: {proudctoEncontardo?.id}</h1>
            <CardInfoProducto producto={proudctoEncontardo}></CardInfoProducto>
        </VendedorLayout>
    )
}

export default DetalleProductoPage