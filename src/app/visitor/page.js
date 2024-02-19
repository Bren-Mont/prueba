"use client";
import * as yup from "yup";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import "@/app/globals.css";
import {} from "./style/visitor.css";
import Logo from "@/app/assets/images/logo-toscana.jpeg";
import Banner from "@/app/assets/images/banner-visitantes.png";
import ApiService from "@/app/Infraestructure/axios";
import { Complexex } from "./components/Complexex";
import Authorization from "./components/Authorization";
import VisitorComponent from "./components/Visitor";
import LottieLoader from "@/app/components/lottie-loader/LottieLoader";
import MessageToast from "@/app/components/toast/MessageToast";
import MessageToastConfirm from "@/app/components/toast/MessageToastConfirm";

export default function Visitor() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      subname: "",
      doc_id: null,
      gender: "",
      delivery: false,
      phone_number: "",
      plate: "",
      doc_type: null,
      unit_id: "",
      resident_id: "",
      type_id: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        complexex: yup.array().of(
          yup.object().shape({
            name: yup.string().required("Este campo es obligatorio"),
            subname: yup.string().required("Este campo es obligatorio"),
            doc_id: yup.number().required("Este campo es obligatorio"),
            gender: yup.string().required("Este campo es obligatorio"),
            phone_number: yup.number().required("Este campo es obligatorio"),
            doc_type: yup.number().required("Este campo es obligatorio"),
            plate: yup.string().required("Este campo es obligatorio"),
            unit_id: yup.string().required("Este campo es obligatorio"),
            resident_id: yup.string().required("Este campo es obligatorio"),
            type_id: yup.string().required("Este campo es obligatorio"),
          })
        ),
      })
    ),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const { data } = await ApiService.post("visitors/visitor/", values);
      setConfirmMessage("Guardado exitosamente");
    } catch (error) {
      setErrorMessage(
        "Error al validar el usuario. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
      console.log(loading);
    }
  };

  return (
    <form name="visitor" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={12}>
          <Image
            src={Banner}
            alt="banner"
            width="100%"
            height="100%"
            layout="responsive"
            style={{
              objectFit: "cover",
            }}
          />
          <Container maxWidth="md" className="z-50 container-residents pb-8">
            <Card className="card-custom mx-8 bg-white pl-8 pt-8 pr-8 pb-8 ">
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={4}>
                  <Image
                    src={Logo}
                    alt="logo toscana"
                    width={100}
                    height={70}
                  />

                  <Divider orientation="vertical" flexItem />
                </Grid>
                <Grid item xs={12} md={8} className="bg-red">
                  <Typography className="tittlesApp">
                    Registro visitantes
                  </Typography>
                </Grid>
              </Grid>
              <CardContent>
                <Typography className="text-center text-xs mb-4">
                  Selecciona la torre y el apartamento al que se dirige el
                  visitante.
                </Typography>
              </CardContent>

              <Complexex control={control} errors={errors} />
              <Authorization control={control} errors={errors} />
              <VisitorComponent control={control} errors={errors} />

              <div className="button-send">
                <Button
                  className="color-button"
                  variant="outlined"
                  type="submit"
                >
                  Registrar
                </Button>
              </div>
              <LottieLoader show={loading} />
              {confirmMessage && (
                <MessageToastConfirm
                  message={errorMessage}
                  onClose={() => setConfirmMessage(null)}
                />
              )}
              {errorMessage && (
                <MessageToast
                  message={errorMessage}
                  onClose={() => setErrorMessage(null)}
                />
              )}
            </Card>
          </Container>
        </Grid>
      </Grid>
    </form>
  );
}
