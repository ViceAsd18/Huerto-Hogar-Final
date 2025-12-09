import { Form, Input, Select, Button } from "antd";
import type { User } from "services/usuario";

interface Props {
    initialValues: User;
    onFinish: (values: Partial<User>) => void;
}

const UsuarioForm = ({ initialValues, onFinish }: Props) => (
    <Form initialValues={initialValues} onFinish={onFinish} layout="vertical">
        <Form.Item label="Nombre" name="nombre" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input />
        </Form.Item>
        <Form.Item label="Rol" name="rol" rules={[{ required: true }]}>
            <Select>
                <Select.Option value="cliente">Cliente</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="empleado">Vendedor</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Guardar</Button>
        </Form.Item>
    </Form>
);

export default UsuarioForm;
