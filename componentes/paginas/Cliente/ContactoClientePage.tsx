import ClienteLayout from "componentes/layout/ClienteLayout";
import FormularioContacto from "componentes/organismo/Cliente/Contacto/FormContacto";
import PanelInformacion from "componentes/organismo/Cliente/Contacto/PanelInformacion";

const contenedorStyle : React.CSSProperties = {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: '100px',
}

const ContactoClientePage = () => {
    return (
        <ClienteLayout>
            <div style={contenedorStyle}>
                <FormularioContacto />
                <PanelInformacion />
            </div>


        </ClienteLayout>
    )
}

export default ContactoClientePage;     