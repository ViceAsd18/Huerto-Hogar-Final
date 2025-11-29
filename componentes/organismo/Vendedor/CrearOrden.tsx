import { useState } from "react";
import { Divider, Row, Col, Input, message } from "antd";
import ProductoFila from "componentes/moleculas/Vendedor/Orden/ProductoFila";
import OrdenItem from "componentes/moleculas/Vendedor/Orden/OrdenItem";
import Boton from "componentes/atomos/Boton";
import SelectOpciones from "componentes/atomos/SelectOpciones";
import type { Producto } from "modelo/productoModel";
import Titulo from "componentes/atomos/Titulo";
import ModalPago from "componentes/moleculas/Vendedor/ModalPago";

const estiloListaProductos: React.CSSProperties = {
    background: "#f9f9f9",
    border: "1px solid #e0e0e0",
    padding: 12,
    borderRadius: 6,
    maxHeight: 600,
    overflowY: "auto",
};

const estiloPanelOrden: React.CSSProperties = {
    background: "#f9f9f9",
    border: "1px solid #e0e0e0",
    padding: 12,
    borderRadius: 6,
};

type Props = {
    productosDisponibles: Producto[];
    clientes: string[];
    onGenerarOrden: (cliente: string, productos: (Producto & { cantidad: number })[]) => void;
};

const CrearOrden = ({ productosDisponibles, clientes, onGenerarOrden }: Props) => {

    /* 
    productosEnCarrito → productos seleccionados para la orden
    cliente → cliente seleccionado
    modalPagoVisible → visibilidad del modal de pago
    search → texto del buscador de productos
    */
    const [productosEnCarrito, setProductosEnCarrito] = useState<(Producto & { cantidad: number })[]>([]);
    const [cliente, setCliente] = useState<string>();
    const [modalPagoVisible, setModalPagoVisible] = useState(false);
    const [search, setSearch] = useState("");

    //Agregar producto al carrito
    const agregarProducto = (producto: Producto) => {
        setProductosEnCarrito(prev => {
            const isPresent = prev.find(p => p.id === producto.id);

            //Si ya existe, solo aumenta cantidad
            if (isPresent) {
                return prev.map(p =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            }

            //Si no existe, se agrega
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    //Actualizar cantidad de un producto
    const actualizarCantidad = (id: number, cantidad: number) => {
        setProductosEnCarrito(prev =>
            prev.map(p => (p.id === id ? { ...p, cantidad } : p))
        );
    };

    //Eliminar producto del carrito
    const eliminarProducto = (id: number) => {
        setProductosEnCarrito(prev =>
            prev.filter(p => p.id !== id)
        );
    };

    //Calcular totales
    const subtotal = productosEnCarrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const impuesto = subtotal * 0.19;
    const totalOrden = subtotal + impuesto;

    /*
    Filtrar productos:
    1. Oculta productos ya agregados al carrito
    2. Aplica el buscador
    */
    const productosFiltrados = productosDisponibles
        .filter(p => !productosEnCarrito.some(pe => pe.id === p.id))
        .filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <Row gutter={16}>
                <Col span={16} style={estiloListaProductos}>
                    <Input.Search
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ marginBottom: 12 }}
                        allowClear
                    />
                    {productosFiltrados.map(producto => (
                        <ProductoFila
                            key={producto.id}
                            producto={producto}
                            onAgregar={agregarProducto}
                        />
                    ))}
                </Col>

                <Col span={8} style={estiloPanelOrden}>
                    <Titulo nivel={3}>Detalle de la Orden</Titulo>
                    
                    <SelectOpciones
                        valor={cliente}
                        onChange={setCliente}
                        opciones={clientes}
                        placeholder="Seleccione un cliente"
                    />

                    <Divider />

                    <div style={{ maxHeight: 350, overflowY: "auto" }}>
                        {productosEnCarrito.map(p => (
                            <OrdenItem
                                key={p.id}
                                producto={p}
                                onCantidadChange={actualizarCantidad}
                                onEliminar={eliminarProducto}
                            />
                        ))}
                    </div>

                    <Divider />

                    <div>
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Impuesto 19%: ${impuesto.toFixed(2)}</p>
                        <p><b>Total: ${totalOrden.toFixed(2)}</b></p>
                    </div>

                    <Row gutter={8} justify="end" style={{ marginTop: 10 }}>
                        
                        <Boton color="red"
                            onClick={() => {
                                if (!cliente) return message.error("Seleccione un cliente");
                                onGenerarOrden(cliente, productosEnCarrito);
                            }}
                        >
                            Generar Orden
                        </Boton>

                        <Boton onClick={() => setModalPagoVisible(true)} color="#20c997">
                            Pagar Orden
                        </Boton>
                    </Row>
                </Col>
            </Row>

            <ModalPago
                visible={modalPagoVisible}
                onClose={() => setModalPagoVisible(false)}
                total={totalOrden}
                cliente={cliente || ""}
                ordenId={1234}
                onRegistrarPago={(monto) => console.log("Pago:", monto)}
            />
        </>
    );
};

export default CrearOrden;
