import {FaUser, FaLock} from "react-icons/fa";
import { useState } from "react";
//import "./Login.css";

const Login = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        alert("Enviando os dados:" + username + " - " + password);
    };

    return (
        <div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h1>Seja bem-vindo!</h1>
                    <div className="input-field">
                      <input type="email" placeholder='E-mail' required onChange={(e) => setUsername(e.target.value)}/>
                      <FaUser className='icon'/>
                    </div>
                    <div className="input-field">
                      <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
                      <FaLock className='icon'/>
                    </div>
                        <button type='submit'>Entrar</button>
                        <div className="recall-forget">
                            <a href='#'>Esqueceu a senha?</a>
                        </div>
                        <div className="register">
                            <p>Não tem uma conta? <a href='#'>Registre-se</a></p>
                        </div>


                </form>
            </div>
        </div>
    );
}

    export default Login