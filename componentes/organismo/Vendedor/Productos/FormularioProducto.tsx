import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { getCategorias, type Categoria } from "services/categoria";

const { Option } = Select;

interface Props {
    modo: "crear" | "editar";
    productoInicial?: any;
    loading?: boolean;
    onSubmit: (values: any) => void;
}

const FormularioProducto = ({ modo, productoInicial, loading, onSubmit }: Props) => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        const fetchCategorias = async () => {
        const data = await getCategorias();
        setCategorias(data);
        };
        fetchCategorias();
    }, []);

    return (
        <Form
            layout="vertical"
            initialValues={productoInicial}
            onFinish={onSubmit}
        >
            <Form.Item
                name="nombre_producto"
                label="Nombre"
                rules={[{ required: true }]}
            >
                <Input placeholder="Nombre del producto" />
            </Form.Item>

            <Form.Item
                name="descripcion_producto"
                label="Descripción"
                rules={[{ required: true }]}
            >
                <Input.TextArea placeholder="Descripción" />
            </Form.Item>

            <Form.Item
                name="precio"
                label="Precio"
                rules={[{ required: true }]}
            >
                <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true }]}
            >
                <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                name="categoriaId"
                label="Categoría"
                rules={[{ required: true }]}
            >
                <Select placeholder="Selecciona una categoría">
                {categorias.map(c => (
                    <Option key={c.id_categoria} value={c.id_categoria}>
                    {c.nombre_categoria}
                    </Option>
                ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                {modo === "crear" ? "Crear Producto" : "Guardar Cambios"}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormularioProducto;
