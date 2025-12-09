import React, { useEffect, useState } from "react";
import VendedorLayout from "componentes/layout/VendedorLayout";
import { getUsuarios, type User } from "services/usuario";
import { Spin } from "antd";
import UsuariosTable from "componentes/atomos/UsuariosTable";
import Titulo from "componentes/atomos/Titulo";
import ControlsTabla from "componentes/moleculas/Vendedor/ControlsTabla";
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
      const data = await getUsuarios();
      setUsuarios(data);
      setLoading(false);
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
        opcionesFiltro={["cliente", "admin",'empleado']} 
        onBotonClick={() => navigate("/registro")} 
      />

      {loading ? (
        <Spin />
      ) : (
        <UsuariosTable usuarios={usuariosFiltrados} onEditar={handleEditarUsuario} />
      )}
    </VendedorLayout>
  );
};

export default UsuariosPage;
