import VendedorLayout from "componentes/layout/VendedorLayout"
import Titulo from "componentes/atomos/Titulo";
import CrearOrden from "componentes/organismo/Vendedor/CrearOrden";
import { productosMock } from "modelo/productoModel";

const clientesMock = ["Carlos Santana", "Elena Rodríguez", "Javier Gómez", "Sofía López"];

const CrearOrdenPage = () => {

    const handleGenerarOrden = (cliente : string, productos : any[]) => {
        console.log("Orden generada para:", cliente);
        console.log("Productos en la orden:", productos);
        //Llamar API
    }

    return (
        <VendedorLayout>
            <Titulo>Crear Nueva Orden</Titulo>

            <CrearOrden
                productosDisponibles={[productosMock[0], productosMock[1], productosMock[2]]}
                clientes={clientesMock}
                onGenerarOrden={handleGenerarOrden}
            >
            </CrearOrden>
        </VendedorLayout>
    )
}

export default CrearOrdenPage