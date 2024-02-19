"use client";
import Image from "next/image";
import { DatePicker, Space } from "antd";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import "./../style/residents.css";
import { Contact } from "./Contact";
import ApiService from "@/app/Infraestructure/axios";
import Propiertarios from "@/app/assets/images/icono-usuarios.png";
import NumericFormatCustom from "@/app/components/numeric-format/NumericFormat";
import TelephoneFormatCustom from "@/app/components/numeric-format/TelephonFormat";

export default function Owners({ control, errors }) {
  
  const [document, setDocument] = useState();
  const onChangeBirthday = (date, dateString) => {
    console.log(date, dateString);
  };

  const typeDocument = async () => {
    try {
      const { data } = await ApiService.get("/users/documentType/");
      setDocument(data.results);
      console.log(data);
    } catch (error) {
      console.error("Error al obtener tipo de documento:", error);
    }
  };

  useEffect(() => {
    typeDocument();
  }, []);
  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} md={4} align="center">
          <Image
            src={Propiertarios}
            alt="logo propiertario"
            width={100}
            height={100}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className="subTittlesApp">
            REGISTRO DE RESIDENTES
          </Typography>
          <Typography className="text-center text-xs">
            En esta sección registre las personas residentes del inmueble.
          </Typography>
        </Grid>
      </Grid>
      <CardContent>
        <Typography className="subTittlesAppTwo mb-4">
          Datos de contacto principal
        </Typography>
        <Divider
          className="border-t-2 border-gray-500 mb-4"
          orientation="horizontal"
          flexItem
        />
      </CardContent>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={4}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="text-custom mb-4 bg-slate-100 rounded-lg bg-slate-100 rounded-lg"
                error={!!errors.name}
                helperText={errors?.name?.message}
                label="Nombre y apellido"
                id="name"
                fullWidth
                size="small"
                required
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="tax_id_type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className=" mb-4 bg-slate-100 rounded-lg bg-slate-100 rounded-lg"
                error={!!errors.tax_id_type}
                helperText={errors?.tax_id_type?.message}
                label="Tipo "
                autoFocus
                id="tax_id_type"
                variant="outlined"
                fullWidth
                required
                select
                size="small"
              >
                {document?.map((item) => (
                  <MenuItem key={item.id_type_id} value={item.id_type_id}>
                    {item.document_type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="tax_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4rounded-lg bg-slate-100 rounded-lg	"
                error={!!errors.tax_id}
                helperText={errors?.tax_id?.message}
                label="Número de documento"
                autoFocus
                id="tax_id"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => {
                  field.onChange(e);
                }}
                InputProps={{
                  inputComponent: NumericFormatCustom,
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={4}>
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                error={!!errors.phone_number}
                helperText={errors?.phone_number?.message}
                label="Número de celular"
                autoFocus
                id="phone_number"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => {
                  field.onChange(e);
                }}
                InputProps={{
                  inputComponent: TelephoneFormatCustom,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100  rounded-lg"
                error={!!errors.email}
                helperText={errors?.email?.message}
                label="Correo electrónico"
                autoFocus
                id="email"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="birthdate"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="mb-4 bg-slate-100 rounded-lg  border-white"
                variant="outlined"
                onChange={(e) => {
                  field.onChange(e);
                  const date = DateTime.fromObject(e.$d).toISODate();
                  onChangeBirthday();
                }}
                placeholder="Fecha de nacimiento"
                style={{ height: '43px' }}
                size="large"
              />
            )}
          />
        </Grid>
      </Grid>
      
    </div>
  );
}
