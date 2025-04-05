import { useState } from "react";
import { Box, TextField, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) && !email.endsWith(".") && !email.startsWith("@");
};

const Login = () => {
  const navigate = useNavigate(); // Hook para navegação

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: value.trim() !== "" && !validateEmail(value),
      }));
    } else if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors = {
      email: !validateEmail(userData.email),
      password: !userData.password,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      alert("Login realizado com sucesso!");
      navigate("/Register"); 
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
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              color: "#0f4b7e",
              fontWeight: 600,
              letterSpacing: "0.3px",
              mb: 1,
            }}
          >
            Login
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1rem" }}>
            Rápido e fácil
          </Typography>

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
              setErrors((prev) => ({
                ...prev,
                email: userData.email.trim() !== "" && !validateEmail(userData.email),
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

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            Entrar
          </Button>

          {/* Botão "Criar Conta" */}
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/register")}
          >
            Criar Conta
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
