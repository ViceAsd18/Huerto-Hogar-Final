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
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUsuario = async () => {
            if (!id) return;
            setLoading(true);
            setError(false);
            try {
                const data = await getUsuarioById(Number(id));
                if (!data) {
                    setError(true);
                } else {
                    setUsuario(data);
                }
            } catch (err) {
                console.error("Error al cargar usuario:", err);
                message.error("No se pudo cargar el usuario");
                setError(true);
            } finally {
                setLoading(false);
            }
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
            console.error(error);
            message.error("Error al actualizar usuario");
        }
    };

    if (loading) {
        return (
            <VendedorLayout>
                <div style={{ textAlign: "center", padding: 50 }}>
                    <Spin size="large" />
                </div>
            </VendedorLayout>
        );
    }

    if (error || !usuario) {
        return (
            <VendedorLayout>
                <div style={{ textAlign: "center", padding: 50 }}>
                    <h2>No se pudo cargar el usuario</h2>
                </div>
            </VendedorLayout>
        );
    }

    return (
        <VendedorLayout>
            <UsuarioForm initialValues={usuario} onFinish={handleFinish} />
        </VendedorLayout>
    );
};

export default EditarUsuarioPage;
