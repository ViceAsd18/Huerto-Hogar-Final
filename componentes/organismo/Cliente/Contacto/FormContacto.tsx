import { Form, Input, message } from "antd";
import Boton from "componentes/atomos/Boton";
import Texto from "componentes/atomos/Texto";
import Titulo from "componentes/atomos/Titulo";
const { TextArea } = Input;


const FormularioContacto = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("Formulario enviado:", values);
        message.info("¡Mensaje enviado!");
        form.resetFields();
    };

return (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <Titulo nivel={1}>
            Conéctate con HuertoHogar
        </Titulo>

        <Texto style={{fontSize : 18}}>Estamos aqui para ayudarte. Envíanos tus consultas o sugerencias y te responderemos a la brevedad.</Texto>

        <Form layout="vertical" onFinish={onFinish} size="large" form={form} style={{ marginTop: 20}}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Form.Item label="Nombre Completo" name="nombre" rules={[{ required: true }]}>
                    <Input placeholder="Ingresa tu nombre completo" />
                </Form.Item>

                <Form.Item label="Teléfono" name="telefono">
                    <Input placeholder="Ingresa tu teléfono" />
                </Form.Item>
            </div>

            <Form.Item
                label="Correo Electrónico"
                name="email"
                rules={[{ required: true, type: "email" }]}
            >
                <Input placeholder="Ingresa tu correo electrónico" />
            </Form.Item>

            <Form.Item
                label="Mensaje"
                name="mensaje"
                rules={[{ required: true }]}
            >
                <TextArea rows={5} placeholder="Escribe aquí tu mensaje..." />
            </Form.Item>

            <Boton htmlType="submit" style={{width : '100%', height : 50, fontSize : '1.1rem', background : '#007bff'}}>Enviar Mensaje</Boton>

        </Form>

    </div>
);

};

export default FormularioContacto;
