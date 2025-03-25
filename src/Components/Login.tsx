import {FaUser, FaLock} from "react-icons/fa";
import { useState } from "react";
import { Box, TextField } from "@mui/material";
//import "./Login.css";

const Login = () => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[confirmEmail, setConfirmEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");  
    const [error, setError] = useState("");
    

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !email || !confirmEmail || !password || !confirmPassword) {
            setError("Preencha todos os campos!");
            return;
        }
        
        if (email !== confirmEmail) {
            setError("Os e-mails não coincidem!");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem!");
            return;
        }

        alert("Seu e-mail: " + email + " e " + "sua senha foram cadastrados com sucesso!");
    };

    return (
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <h2>Informações Pessoais</h2>

        <div>
          <TextField
            required
            id="outlined-required"
            label="Nome"
          />
          <TextField
            required
            id="outlined-disabled"
            label="Sobrenome"
            // defaultValue="Hello World"
          />
          <TextField
            required
            id="outlined-disabled"
            label="CPF"
            type="text"
          />
          <TextField
            required
            id="outlined-required"
            label="Data de Nascimento"
            type="date"
          />
          <TextField
            required
            id="outlined-required"
            label="Nº de telefone"
           
          />
          <TextField 
            required
            id="outlined-required"
            label="Rua"
            />
          <TextField
            required
            id="outlined-required"
            label="Número"
          />
          <TextField
            required
            id="outlined-required"
            label="Complemento"
          />
          <TextField
            required
            id="outlined-required"
            label="Bairro"
          />
          <TextField
            required
            id="outlined-required"
            label="Cidade"
          />
          <TextField
            required
            id="outlined-required"
            label="Estado"
          />
          <TextField
            required
            id="outlined-required"
            label="CEP"
          />

        </div>

        <h2>Informações de Login</h2>

        <div>
        <TextField 
            required
            id="outlined-required"
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
           />
          <TextField
            required
            id="outlined-email-input"
            label="Confirme seu e-mail"
            type="email"
            value={confirmEmail}
            onChange={event => setConfirmEmail(event.target.value)}
          />
          <TextField
            required
            id="filled-password-input"
            label="Senha"
            type="password"
          />
          <TextField
            required
            id="filled-password-input"
            label="Confirme sua senha"
            type="password"
          />
        </div>  
        <button onClick={handleSubmit}>Cadastrar</button>
        
      </Box>
    );
}

    export default Login