import VendedorLayout from "componentes/layout/VendedorLayout";
import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router";
import type { Orden } from "services/orden";

import Titulo from "componentes/atomos/Titulo";
import TablaOrdenes from "componentes/organismo/Vendedor/Ordenes/TablaOrdenes";
import ModalPago from "componentes/organismo/Vendedor/Modal/ModalPago";
import { actualizarOrden, getOrdenById, getOrdenes, registrarPagoOrden } from "services/orden";

const OrdenesPage = () => {

    const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState<string | undefined>();

    const [modalVisible, setModalVisible] = useState(false);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState<Orden | null>(null);

    const [ordenes, setOrdenes] = useState<Orden[]>([]);

    //Loaders
    const [loading, setLoading] = useState(true);
    const [loadingPago, setLoadingPago] = useState(false);
    const [loadingCancelar, setLoadingCancelar] = useState(false);

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                setLoading(true);
                const data = await getOrdenes();
                setOrdenes(data);
            } catch (error) {
                console.error("Error al cargar órdenes:", error);
                message.error("No se pudieron cargar las órdenes");
            } finally {
                setLoading(false);
            }
        };

        fetchOrdenes();
    }, []);

    const handleNuevaOrden = () => {
        navigate('/crear-orden');
    };

    const handleVerDetalle = (orden: Orden) => {
        navigate(`/orden/${orden.id_venta}`);
    };

    const handlePagarOrden = (orden: Orden) => {
        setOrdenSeleccionada(orden);
        setModalVisible(true);
    };

    const handleRegistrarPago = async () => {
        if (!ordenSeleccionada) return;

        try {
            setLoadingPago(true);

            await registrarPagoOrden(ordenSeleccionada);

            const ordenActualizada = await getOrdenById(ordenSeleccionada.id_venta);

            setOrdenes(prev =>
                prev.map(o =>
                    o.id_venta === ordenSeleccionada.id_venta ? ordenActualizada : o
                )
            );

            setModalVisible(false);
            setOrdenSeleccionada(null);
            message.success("Pago registrado con éxito");

        } catch (error) {
            console.error(error);
            message.error("No se pudo registrar el pago");
        } finally {
            setLoadingPago(false);
        }
    };

    const handleCancelarOrden = async (orden: Orden) => {
        try {
            setLoadingCancelar(true);

            await actualizarOrden(orden.id_venta, { estado: "cancelada" });

            message.success(`Orden #${orden.id_venta} cancelada`);

            setOrdenes(prev =>
                prev.map(o =>
                    o.id_venta === orden.id_venta
                        ? { ...o, estado: "cancelada" }
                        : o
                )
            );

        } catch (error) {
            console.error(error);
            message.error("No se pudo cancelar la orden");
        } finally {
            setLoadingCancelar(false);
        }
    };

    if (loading) {
        return (
            <VendedorLayout>
                <Titulo nivel={2}>Cargando órdenes...</Titulo>
            </VendedorLayout>
        );
    }

    return (
        <VendedorLayout>
            <Titulo nivel={1}>Gestión de Órdenes</Titulo>

            <TablaOrdenes
                ordenes={ordenes}
                busqueda={busqueda}
                onBusquedaChange={setBusqueda}
                estadoFiltro={estadoFiltro}
                onEstadoChange={setEstadoFiltro}
                onVerDetalle={handleVerDetalle}
                onPagarOrden={handlePagarOrden}
                onNuevaOrden={handleNuevaOrden}
                onCancelarOrden={handleCancelarOrden}
                loadingCancelar={loadingCancelar}
            />

            {ordenSeleccionada && (
                <ModalPago
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    ordenId={ordenSeleccionada.id_venta}
                    cliente={ordenSeleccionada.usuario.nombre}
                    total={ordenSeleccionada.total}
                    confirmLoading={loadingPago}
                    onRegistrarPago={handleRegistrarPago}
                />
            )}
        </VendedorLayout>
    );
};

export default OrdenesPage;
