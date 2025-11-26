import VendedorLayout from "componentes/layout/VendedorLayout"
import { Card, Space, Typography } from "antd"
import { useState } from "react"
import type { Producto } from "modelo/productoModel"
import { productosMock } from "modelo/productoModel"
import BarraFiltros from "../../componentes/moleculas/BarraFiltros"
import { useNavigate } from "react-router"
import CatalogoProductos from "componentes/organismo/CatalogoProductos"
import Titulo from "componentes/atomos/Titulo"

const { Title } = Typography;

const ProductosPage = () => {
    const [productos] = useState<Producto[]>(productosMock);
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>();
    const [disponibilidadSeleccionada, setDisponibilidadSeleccionada] = useState<string>();

    const navigate = useNavigate();


    const handleVerDetalle = (producto: Producto) => {
        navigate(`/detalle-producto/${producto.id}`);

    };

    // Filtrar productos
    const productosFiltrados = productos.filter(producto => {
        const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = !categoriaSeleccionada || producto.categoria === categoriaSeleccionada;
        
        let coincideDisponibilidad = true;
        if (disponibilidadSeleccionada === "En stock") {
            coincideDisponibilidad = producto.stock > 0;
        } else if (disponibilidadSeleccionada === "Stock Bajo") {
            coincideDisponibilidad = producto.stock > 0 && producto.stock <= 50;
        } else if (disponibilidadSeleccionada === "Sin Stock") {
            coincideDisponibilidad = producto.stock === 0;
        }


        return coincideBusqueda && coincideCategoria && coincideDisponibilidad;
    });



    return (
        <VendedorLayout>
            <Card>
                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <Title level={2} style={{ margin: 0 }}>
                        Gestión de Productos
                    </Title>
                    
                    <BarraFiltros
                        busqueda={busqueda}
                        onBusquedaChange={setBusqueda}
                        categoria={categoriaSeleccionada}
                        onCategoriaChange={setCategoriaSeleccionada}
                        disponibilidad={disponibilidadSeleccionada}
                        onDisponibilidadChange={setDisponibilidadSeleccionada}
                    />

                    <CatalogoProductos
                        productos={productosFiltrados}
                        onVerDetalle={handleVerDetalle}
                    />
                </Space>
            </Card>
        </VendedorLayout>
    )
}

export default ProductosPage;