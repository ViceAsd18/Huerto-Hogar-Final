import { useEffect, useState } from "react";
import { getClientes } from "services/usuario";
import type { User } from "services/usuario";
import VendedorLayout from "componentes/layout/VendedorLayout";
import Titulo from "componentes/atomos/Titulo";
import CrearOrden from "componentes/organismo/Vendedor/Ordenes/CrearOrden";
import { getProductoById, getProductos, type Producto } from "services/productos";
import { crearOrden, registrarPagoOrden } from "services/orden";
import { message, Spin, Alert, Button } from "antd";
import { useNavigate } from "react-router";
import ModalPago from "componentes/organismo/Vendedor/Modal/ModalPago";

const CrearOrdenPage = () => {
    const [clientes, setClientes] = useState<User[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [ordenParaPagar, setOrdenParaPagar] = useState<any | null>(null);
    const [modalPagoVisible, setModalPagoVisible] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const cargarDatos = async () => {
        try {
            setLoading(true);
            setError(null);

            const [clientesData, productosData] = await Promise.all([
                getClientes(),
                getProductos()
            ]);

            setClientes(clientesData);
            setProductos(productosData);
        } catch (err) {
            console.error(err);
            setError("Error al cargar clientes y productos. Intenta recargar.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleGenerarOrden = async (clienteId: number, productosSeleccionados: any[]) => {
        const detalles = productosSeleccionados.map(p => ({
            productoId: p.id_producto,
            cantidad: p.cantidad,
            subtotal: p.cantidad * p.precio
        }));

        const total = Math.round(detalles.reduce((sum, d) => sum + d.subtotal, 0) * 1.19);

        try {
            await crearOrden({
                usuarioId: clienteId,
                fecha_venta: new Date().toISOString(),
                total,
                estado: "pendiente",
                metodo_pago: "efectivo",
                detalles
            });

            message.success("Orden creada exitosamente");
            navigate("/ordenes");
        } catch {
            message.error("Error al crear la orden");
        }
    };

    const handlePagarOrden = async (clienteId: number, productosSeleccionados: any[]) => {
        try {
            const total = Math.round(
                productosSeleccionados.reduce((sum, p) => sum + p.cantidad * p.precio, 0) * 1.19
            );

            const nuevaOrden = await crearOrden({
                usuarioId: clienteId,
                fecha_venta: new Date().toISOString(),
                total,
                estado: "pendiente",
                metodo_pago: "efectivo",
                detalles: productosSeleccionados.map(p => ({
                    productoId: p.id_producto,
                    cantidad: p.cantidad,
                    subtotal: p.cantidad * p.precio,
                })),
            });

            const detallesCompletos = await Promise.all(
                productosSeleccionados.map(async p => {
                    const productoBackend = await getProductoById(p.id_producto);
                    return {
                        id_detalle: 0,
                        cantidad: p.cantidad,
                        subtotal: p.cantidad * p.precio,
                        producto: productoBackend,
                    };
                })
            );

            setOrdenParaPagar({
                ...nuevaOrden,
                detalles: detallesCompletos,
                total,
                clienteNombre: clientes.find(c => c.id_usuario === clienteId)?.nombre ?? "",
            });

            setModalPagoVisible(true);
        } catch (error) {
            console.error(error);
            message.error("Error al crear la orden");
        }
    };

    const handleRegistrarPagoModal = async () => {
        if (!ordenParaPagar) return;

        try {
            await registrarPagoOrden(ordenParaPagar);
            setModalPagoVisible(false);
            setOrdenParaPagar(null);
            message.success("Pago registrado y stock actualizado");
        } catch {
            message.error("No se pudo registrar el pago");
        }
    };

    return (
        <VendedorLayout>
            <Titulo>Crear Nueva Orden</Titulo>

            {error && (
                <Alert
                    type="error"
                    message="Error al cargar datos"
                    description={error}
                    showIcon
                    style={{ marginBottom: 20 }}
                    action={
                        <Button onClick={cargarDatos} size="small">
                            Reintentar
                        </Button>
                    }
                />
            )}

            {loading ? (
                <div style={{ textAlign: "center", padding: 50 }}>
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <CrearOrden
                        productosDisponibles={productos}
                        clientes={clientes}
                        onGenerarOrden={handleGenerarOrden}
                        onPagarOrden={handlePagarOrden}
                    />

                    {ordenParaPagar && (
                        <ModalPago
                            visible={modalPagoVisible}
                            onClose={() => setModalPagoVisible(false)}
                            total={ordenParaPagar.total}
                            cliente={ordenParaPagar.clienteNombre}
                            ordenId={ordenParaPagar.id_venta}
                            onRegistrarPago={handleRegistrarPagoModal}
                        />
                    )}
                </>
            )}
        </VendedorLayout>
    );
};

export default CrearOrdenPage;
