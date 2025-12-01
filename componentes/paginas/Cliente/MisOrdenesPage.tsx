import ClienteLayout from "../../layout/ClienteLayout";
import ListaOrdenesCliente from "componentes/organismo/Cliente/ListaOrdenesCliente";
import { Typography, Spin, Space } from "antd";
import { useEffect, useState } from "react";
import { getOrdenes, type Orden } from "services/orden";
import { useAuth } from "auth/AuthContext";
import Titulo from "componentes/atomos/Titulo";


const { Title, Text } = Typography;

const MisOrdenesPage = () => {
    const { user } = useAuth();

    const [ordenes, setOrdenes] = useState<Orden[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchOrdenes = async () => {
            if (!user) {
                console.log("No hay usuario logueado todavía");
                return;
            }

            try {
                setLoading(true);

                const todas = await getOrdenes();

                const filtradas = todas.filter(
                    (o: any) => o.usuario?.id_usuario === user.id_usuario
                );

                setOrdenes(filtradas);
            } catch (error) {
                console.error("Error al obtener órdenes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdenes();
    }, [user]);



    return (
        <ClienteLayout>
            <div style={{ padding: "20px 0", maxWidth: 1000, margin: "0 auto" }}>
                
                <Titulo nivel={2}>Mis Órdenes</Titulo>
                <Text type="secondary">Revisa el estado de tus compras recientes</Text>
                
                {loading ? (
                    <div style={{ textAlign: "center", padding: 50 }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <ListaOrdenesCliente ordenes={ordenes} />
                )}

            </div>
        </ClienteLayout>
    );
};

export default MisOrdenesPage;
