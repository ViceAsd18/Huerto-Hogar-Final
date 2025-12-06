import { Layout } from "antd";
import BarraNavegacion from "componentes/organismo/Cliente/BarraNavegacion";

const { Header, Content, Footer } = Layout;

const ClienteLayout = ({ children }: { children: React.ReactNode }) => {
    const headerStyle: React.CSSProperties = {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        padding: '10px 24px',
        height: '100%',
        overflow : 'auto'
    };


    return (
        <Layout style={{ minHeight: '100vh', background: '#f9f9f9' }}>
            <Header style={headerStyle}>
                <BarraNavegacion/>
            </Header>

            <Content style={{ padding: '0 24px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
                <div style={{ margin: '50px 0', minHeight: 380, gap : 100, display: 'flex', flexDirection: 'column' }}>
                    {children}
                </div>
            </Content>

            <Footer style={{ textAlign: 'center', background: '#fafafa' }}>
                © 2025 SalesSystem. Todos los derechos reservados.
            </Footer>   
        </Layout>
    )
};

export default ClienteLayout;