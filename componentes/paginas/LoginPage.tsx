import LoginForm from "componentes/organismo/LoginForm";
import { message } from "antd";




const LoginPage = () => {

    const handleLogin = (email : string, password : string) => {
        message.loading("Verificando credenciales...");

        //Lamar a la API aka
    }

    return (
        <div>
            <LoginForm onLogin={handleLogin}></LoginForm>
        </div>
    )
}

export default LoginPage;