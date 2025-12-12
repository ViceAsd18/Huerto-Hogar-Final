import VendedorLayout from "componentes/layout/VendedorLayout";
import { useEffect, useState } from "react";
import type { Producto } from "services/productos";
import { useNavigate } from "react-router";
import CatalogoProductos from "componentes/organismo/Vendedor/Productos/CatalogoProductos";
import Titulo from "componentes/atomos/Titulo";
import ControlsTabla from "componentes/organismo/Vendedor/Controls/ControlsTabla";
import { getCategorias, type Categoria } from "services/categoria";
import { eliminarProducto, getProductos } from "services/productos";
import { Card, message, Modal, Space, Spin } from "antd";

const { confirm } = Modal;

const ProductosPage = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>();
    const [opcionesCategoria, setOpcionesCategoria] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categorias = await getCategorias();
                setOpcionesCategoria(categorias);
            } catch (err) {
                console.error("Error al cargar categorías", err);
                message.error("No se pudieron cargar las categorías");
            }
        };
        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                const data = await getProductos();
                setProductos(data);
            } catch (err) {
                console.error("Error al cargar productos", err);
                message.error("No se pudieron cargar los productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    const handleVerDetalle = (producto: Producto) => {
        navigate(`/detalle-producto/${producto.id_producto}`);
    };

    const handleEditarProducto = (producto: Producto) => {
        navigate(`/editar-producto/${producto.id_producto}`);
    };

    const handleEliminarProducto = (producto: Producto) => {
        confirm({
            title: `¿Eliminar producto "${producto.nombre_producto}"?`,
            okText: "Sí, eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk: async () => {
                try {
                    await eliminarProducto(producto.id_producto);
                    setProductos(prev => prev.filter(p => p.id_producto !== producto.id_producto));
                    message.success("Producto eliminado correctamente");
                } catch (err) {
                    console.error(err);
                    message.error("No se pudo eliminar el producto");
                }
            }
        });
    };

    const productosFiltrados = productos.filter(producto => {
        const coincideBusqueda = producto.nombre_producto?.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria =
            !categoriaSeleccionada || producto.categoria.nombre_categoria === categoriaSeleccionada;
        return coincideBusqueda && coincideCategoria;
    });

    return (
        <VendedorLayout>
            <Card>
                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <Titulo nivel={1}>Listado de Productos</Titulo>

                    <ControlsTabla
                        busqueda={busqueda}
                        onBusquedaChange={setBusqueda}
                        filtro={categoriaSeleccionada}
                        onFiltroChange={setCategoriaSeleccionada}
                        opcionesFiltro={opcionesCategoria.map(c => c.nombre_categoria)}
                        placeholderBusqueda="Buscar producto..."
                        textoBoton="Agregar Producto"
                        onBotonClick={() => navigate("/agregar-producto")}
                    />

                    {loading ? (
                        <div style={{ textAlign: "center", marginTop: 50 }}>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <CatalogoProductos
                            productos={productosFiltrados}
                            onVerDetalle={handleVerDetalle}
                            onEditarProducto={handleEditarProducto}
                        />
                    )}
                </Space>
            </Card>
        </VendedorLayout>
    );
};

export default ProductosPage;
