"use client";

import axios from "axios";
import * as yup from "yup";
import Image from "next/image";
import { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button, Container, Grid, TextField } from "@mui/material";

import Logo from "@/app/assets/images-login/Static/usohorizontal.png";
import ApiService from "@/app/Infraestructure/axios";

import "./style/style.css";
import { useRouter } from 'next/navigation'
import { useAuthContext } from "../Contexts/authContext";
//import LottieLoader from "../components/lottie-loader/LottieLoader";

export default function Login() {
  const [error, setError] = useState(null);
  const {token, setToken} = useAuthContext();
  const [showLottie, setShowLottie] = useState(false);
  const router = useRouter()
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          //.email("Ingresa un correo válido")
          .required("debes ingresar un correo electrónico válido"),
        password: yup
          .string()
          .required("Por favor introduce tu contraseña.")
          .min(8, "Contraseña corta - debe tener al menos 8 caracteres."),
      })
    ),
  });

  const onSubmit = async ({email, password}) => {
    try {
      const {data} = await ApiService.post('api/token/', {
        username: email,
        // email,
        password
      })
      setToken(data.access)
      router.push('/visitor')

    } catch (error) {
      setError("Error al validar el usuario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form name="login" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="md" className="centered-card rounded-lg">
        <Card sx={{ width: 380 }}>
          <CardContent>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Image
                src={Logo}
                alt="Logo"
                width="100%"
                height="100%"
                layout="responsive"
                style={{
                  objectFit: "cover",
                }}
              />
              <Grid item xs={12} md={12} className="tittle pt-0">
                <Typography style={{ fontWeight: "bold", fontSize: "32px" }}>
                  Iniciar sesión
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-4 bg-slate-100 rounded-lg "
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      label="Usuario:"
                      autoFocus
                      id="email"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    ></TextField>
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} md={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-4 bg-slate-100 rounded-lg"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                      label="Password:"
                      autoFocus
                      id="password"
                      variant="outlined"
                      type="password"
                      fullWidth
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    ></TextField>
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} md={12}>
                <Button
                  variant="outlined"
                  className="w-full bg-sky-600 button-send "
                  type="submit"
                >
                  Ingresar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </form>
  );
}
