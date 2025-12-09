import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Spin, message } from "antd";
import { getUsuarioById, editarUsuario, type User } from "services/usuario";
import UsuarioForm from "componentes/organismo/admin/UsuarioForm";
import VendedorLayout from "componentes/layout/VendedorLayout";

const EditarUsuarioPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUsuario = async () => {
        if (!id) return;
        setLoading(true);
        const data = await getUsuarioById(Number(id));
        setUsuario(data);
        setLoading(false);
      };
      fetchUsuario();
    }, [id]);

    const handleFinish = async (values: Partial<User>) => {
      if (!usuario) return;
      try {
        await editarUsuario(usuario, values);
        message.success("Usuario actualizado correctamente");
        navigate("/usuarios");
      } catch (error) {
        message.error("Error al actualizar usuario");
      }
    };

    if (loading) return <Spin />;

    return (
      <VendedorLayout>
        {usuario ? <UsuarioForm initialValues={usuario} onFinish={handleFinish} /> : null}
      </VendedorLayout>
    )
  };

export default EditarUsuarioPage;
