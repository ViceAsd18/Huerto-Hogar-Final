import React, { useEffect, useState } from "react";
import VendedorLayout from "componentes/layout/VendedorLayout";
import { getUsuarios, type User } from "services/usuario";
import { Spin, message, Empty } from "antd";
import UsuariosTable from "componentes/moleculas/Admin/UsuariosTable";
import Titulo from "componentes/atomos/Titulo";
import ControlsTabla from "componentes/organismo/Vendedor/Controls/ControlsTabla";
import { useNavigate } from "react-router";

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [filtro, setFiltro] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            try {
                const data = await getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
                message.error("No se pudieron cargar los usuarios");
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    const handleEditarUsuario = (usuario: User) => {
        navigate(`/admin/editar-usuario/${usuario.id_usuario}`);
    };

    // Filtrado + búsqueda
    const usuariosFiltrados = usuarios.filter((u) => {
        const coincideBusqueda =
            u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.email.toLowerCase().includes(busqueda.toLowerCase());
        const coincideFiltro = filtro ? u.rol === filtro : true;
        return coincideBusqueda && coincideFiltro;
    });

    return (
        <VendedorLayout>
            <Titulo nivel={1}>Gestión de usuarios</Titulo>

            <ControlsTabla
                busqueda={busqueda}
                onBusquedaChange={setBusqueda}
                filtro={filtro}
                onFiltroChange={setFiltro}
                opcionesFiltro={["cliente", "admin", "empleado"]}
                onBotonClick={() => navigate("/registro")}
            />

            {loading ? (
                <div style={{ textAlign: "center", padding: 50 }}>
                    <Spin size="large" />
                </div>
            ) : usuariosFiltrados.length === 0 ? (
                <Empty description="No se encontraron usuarios" />
            ) : (
                <UsuariosTable usuarios={usuariosFiltrados} onEditar={handleEditarUsuario} />
            )}
        </VendedorLayout>
    );
};

export default UsuariosPage;
