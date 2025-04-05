import { useState } from "react";
import { Box,  TextField, Container, Typography,  Button, Snackbar, Alert } from "@mui/material";
import { IMaskInput } from "react-imask";
import React from "react";
import { useNavigate } from "react-router-dom";


interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const validateCPF = (cpf: string) => {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
};

const validateDate = (date: string) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(date);
};

const validateTelefone = (telefone: string) => {
  const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return regex.test(telefone);
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

const TELMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TELMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(75) 00000-0000"
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

const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) && 
         !email.endsWith('.') && 
         !email.startsWith('@');
};

const RegisterPage = () => {
  const navigate = useNavigate(); 

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

  const [errors, setErrors] = useState({
    name: false,
    sobrenome: false,
    cpf: false,
    dataNascimento: false,
    telefone: false,
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false,
  });

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value.trim() !== '' && !validateEmail(value)
      }));
    }
    else if (name === 'confirmEmail') {
      setErrors(prev => ({
        ...prev,
        confirmEmail: value.trim() !== '' && value !== userData.email
      }));
    }
    else if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({...prev, [name]: false}));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;
    

    const newErrors = {
      name: !userData.name,
      sobrenome: !userData.sobrenome,
      cpf: !validateCPF(userData.cpf),
      dataNascimento: !validateDate(userData.dataNascimento),
      telefone: !validateTelefone(userData.telefone),
      email: !validateEmail(userData.email),
      confirmEmail: userData.email !== userData.confirmEmail || !userData.confirmEmail,
      password: !userData.password,
      confirmPassword: userData.password !== userData.confirmPassword || !userData.confirmPassword,
    };

    setErrors(newErrors);
    hasError = Object.values(newErrors).some(error => error);

    if (!hasError) {
      setOpenSuccess(true);
      setTimeout(() => {
        navigate("/Login");
      }
      , 2000); 
    }
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
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3"
            sx={{ 
              color: '#0f4b7e',
              fontWeight: 600,
              letterSpacing: '0.3px',
              mb: 1
            }}
          >
            Cadastro
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              color: 'text.secondary',
              fontSize: '1rem'
            }}
          >
            Rápido e fácil
          </Typography>

          <TextField
            label="Nome"
            name="name"
            value={userData.name}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={errors.name}
            helperText={errors.name ? "Campo obrigatório" : ""}
          />
          
          <TextField
            label="Sobrenome"
            name="sobrenome"
            value={userData.sobrenome}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            error={errors.sobrenome}
            helperText={errors.sobrenome ? "Campo obrigatório" : ""}
          />
          
          <TextField
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
            error={errors.cpf}
            helperText={errors.cpf ? "CPF inválido (formato: 000.000.000-00)" : ""}
          />
          
          <TextField
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
            error={errors.dataNascimento}
            helperText={errors.dataNascimento ? "Data inválida (formato: DD/MM/AAAA)" : ""}
          />

          <TextField
            label="Telefone"
            name="telefone"
            value={userData.telefone}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="(00)00000-0000)"
            InputProps={{
              inputComponent: TELMaskCustom as any,
            }}
            sx={{ mb: 2 }}
            error={errors.telefone}
            helperText={errors.telefone ? "Telefone inválido (formato: (00) 00000-0000)" : ""}
          />
          
          <TextField
            label="E-mail"
            name="email"
            value={userData.email}
            onChange={handleChange}
            fullWidth
            size="small"
            type="email"
            sx={{ mb: 2 }}
            error={errors.email}
            helperText={errors.email ? "Digite um e-mail válido (exemplo@dominio.com)" : ""}
            onBlur={() => {
              setErrors(prev => ({
                ...prev,
                email: userData.email.trim() !== '' && !validateEmail(userData.email)
              }));
            }}
          />
          
          <TextField
            label="Confirme seu E-mail"
            name="confirmEmail"
            value={userData.confirmEmail}
            onChange={handleChange}
            fullWidth
            size="small"
            type="email"
            sx={{ mb: 2 }}
            error={errors.confirmEmail}
            helperText={errors.confirmEmail ? "Os e-mails não coincidem" : ""}
            onBlur={() => {
              setErrors(prev => ({
                ...prev,
                confirmEmail: userData.confirmEmail.trim() !== '' && 
                            userData.confirmEmail !== userData.email
              }));
            }}
          />
          
          <TextField
            label="Senha"
            name="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
            size="small"
            type="password"
            sx={{ mb: 2 }}
            error={errors.password}
            helperText={errors.password ? "Campo obrigatório" : ""}
          />
          
          <TextField
            label="Confirme sua Senha"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            fullWidth
            size="small"
            type="password"
            sx={{ mb: 2 }}
            error={errors.confirmPassword}
            helperText={errors.confirmPassword ? "As senhas não coincidem" : ""}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastre-se
          </Button>
        </Box>

        <Snackbar 
          open={openSuccess} 
          autoHideDuration={6000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleClose} 
            severity="success" 
            sx={{ width: '100%' }}
          >
            Cadastro realizado com sucesso!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default RegisterPage;