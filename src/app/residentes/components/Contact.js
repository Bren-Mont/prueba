"use client";
import {
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import {} from "./../style/residents.css";
import { DatePicker, Space } from "antd";
import { useEffect, useState } from "react";
import ApiService from "@/app/Infraestructure/axios";


export function Contact({ control, errors }) {
  const [document, setDocument] = useState();

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

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <CardContent>
        <Typography className="subTittlesAppTwo mb-4">
          Datos de propietario
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
            name="name_contact"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                error={!!errors.name_contact}
                helperText={errors?.name_contact?.message}
                label="Nombre y apellido"
                autoFocus
                size="small"
                id="name_contact"
                variant="outlined"
                fullWidth
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
            name="tax_id_type_contact"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className=" mb-4 bg-slate-100 rounded-lg"
                error={!!errors.tax_id_type_contact}
                helperText={errors?.tax_id_type_contact?.message}
                label="Tipo de documento"
                autoFocus
                id="tax_id_type_contact"
                variant="outlined"
                fullWidth
                size="small"
                required
                select
                onChange={(e) => {
                  field.onChange(e);
                }}
              >
                {document?.map((item) => (
                  <MenuItem key={item.id} value={item.id_type_id}>
                    {item.document_type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="tax_id_contact"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 rounded-lg bg-slate-100	"
                error={!!errors.tax_id_contact}
                helperText={errors?.tax_id_contact?.message}
                label="Número de documento"
                autoFocus
                size="small"
                id="tax_id_contact"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={4}>
          <Controller
            name="phone_number_contact"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                error={!!errors.phone_number_contact}
                helperText={errors?.phone_number_contact?.message}
                label="Número de celular"
                autoFocus
                size="small"
                id="phone_number_contact"
                variant="outlined"
                fullWidth
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
            name="email_contact"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                error={!!errors.email_contact}
                helperText={errors?.email_contact?.message}
                label="Correo electrónico"
                autoFocus
                size="small"
                id="email_contact"
                variant="outlined"
                fullWidth
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
                className="mb-4 bg-slate-100 rounded-lg h-14 border-white"
                variant="outlined"
                onChange={(e) => {
                  field.onChange(e);
                  const date = DateTime.fromObject(e.$d).toISODate();
                  onChangeBirthday();
                }}
                placeholder="Fecha de nacimiento"
                size="large"
                style={{ height: '43px' , width:'230px'}}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}
