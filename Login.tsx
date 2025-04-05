import { useState } from "react";
import { Box, TextField, Container, Typography, Button, Snackbar, Alert } from "@mui/material";
import { IMaskInput } from "react-imask";
import React from "react";


const validateCPF = (cpf: string) => {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
};

// Função para validar data de nascimento
const validateDate = (date: string) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(date);
};

const DateMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function DateMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00/00/0000"
        definitions={{
          "0": /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  }
);

const CPFMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function CPFMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        definitions={{
          "0": /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  }
);



const Login = () => {
  const [userData, setUserData] = useState({
    name: "",
    sobrenome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    cep: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userData.name || !userData.email || !userData.confirmEmail || !userData.password || !userData.confirmPassword) {
      setError("Preencha todos os campos!");
      setOpenSnackbar(true);
      return;
    }

    if (userData.email !== userData.confirmEmail) {
      setError("Os e-mails não coincidem!");
      setOpenSnackbar(true);
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setError("As senhas não coincidem!");
      setOpenSnackbar(true);
      return;
    }

    if (!validateCPF(userData.cpf)) {
      setError("CPF inválido!");
      setOpenSnackbar(true);
      return;
    }

    if (!validateDate(userData.dataNascimento)) {
      setError("Data de nascimento inválida!");
      setOpenSnackbar(true);
      return;
    }

    alert("Cadastro realizado com sucesso!");
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          padding: 3,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

        }}
      >
        <Box sx={{ width: "100%" }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#322886' }}>
        Cadastro
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Rápido e fácil.
        </Typography>

        <TextField
          required
          label="Nome"
          name="name"
          value={userData.name}
          onChange={handleChange}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          required
          label="Sobrenome"
          name="sobrenome"
          value={userData.sobrenome}
          onChange={handleChange}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          required
          label="CPF"
          name="cpf"
          value={userData.cpf}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="000.000.000-00"
          InputProps={{
            inputComponent: CPFMaskCustom as any,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          required
          label="Data de Nascimento"
          name="dataNascimento"
          value={userData.dataNascimento}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="DD/MM/AAAA"
          InputProps={{
            inputComponent: DateMaskCustom as any,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          required
          label="E-mail"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          size="small"
          type="email"
          sx={{ mb: 2 }}
        />
        <TextField
          required
          label="Confirme seu E-mail"
          name="confirmEmail"
          value={userData.confirmEmail}
          onChange={handleChange}
          fullWidth
          size="small"
          type="email"
          sx={{ mb: 2 }}
        />
        <TextField
          required
          label="Senha"
          name="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          size="small"
          type="password"
          sx={{ mb: 2 }}
        />
        <TextField
          required
          label="Confirme sua Senha"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          fullWidth
          size="small"
          type="password"
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Cadastre-se
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
   </Container>
  );
};

export default Login;