"use client";
import { forwardRef, useEffect, useState } from "react";
import { DatePicker } from "antd";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ApiService from "@/app/Infraestructure/axios";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import NumericFormatCustom from "@/app/components/numeric-format/NumericFormat";

export const ResidentsData = forwardRef(function ResidentsData({
  control,
  errors,
  fields,
  remove,
  append,
}) {
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
  return (
    <div>
      <CardContent>
        <Typography className="subTittlesAppTwo mb-4">
          Residentes del inmueble
        </Typography>
        <Divider
          className="border-t-2 border-gray-500 mb-4"
          orientation="horizontal"
          flexItem
        />
      </CardContent>
      {fields.map((item, index) => (
        <section key={item.id} className="mb-8">
          <Grid container spacing={{ xs: 2, md: 3 }} key={index}>
            <Grid item xs={12} md={3}>
              <Controller
                name={`residents.${index}.name`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="custom-textfield mb-4 bg-slate-100 rounded-lg"
                    error={!!errors?.residents?.[index]?.name}
                    helperText={errors?.residents?.[index]?.name?.message}
                    label="Nombre y apellido"
                    autoFocus
                    id="name"
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
                name={`residents.${index}.tax_id_type`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="bg-slate-100 rounded-lg"
                    error={!!errors?.residents?.[index]?.tax_id_type}
                    helperText={
                      !!errors?.residents?.[index]?.tax_id_type?.message
                    }
                    label="Tipo"
                    autoFocus
                    id="tax_id_type"
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    select
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
            <Grid item xs={12} md={3}>
              <Controller
                name={`residents.${index}.tax_id`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="bg-slate-100 rounded-lg"
                    error={!!errors?.residents?.[index].tax_id}
                    helperText={errors?.residents?.[index].tax_id?.message}
                    label="Número de documento"
                    id="tax_id"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    InputProps={{
                      inputComponent: NumericFormatCustom,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Controller
                name={`residents.${index}.birthdate`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className="bg-slate-100 rounded-lg h-14 border-white"
                    variant="outlined"
                    placeholder="Fecha de nacimiento"
                    format="YYYY/MM/DD"
                    style={{ height: "43px" }}
                    size="large"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              {index === 0 && (
                <Button
                type="button"
                className="m-0 p-0"
                startIcon={<AddCircleOutlinedIcon />}
                  onClick={() => {
                    append({
                      firstName: "appendBill",
                      lastName: "appendLuo",
                    });
                  }}
                />
            
              )}
              {index !== 0 && (
                <Button
                  className="m-0 p-0"
                  type="button"
                  onClick={() => remove(index)}
                  startIcon={<DeleteIcon />}
                />
              )}
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 2, md: 3 }} key={index}></Grid>
        </section>
      ))}
    </div>
  );
});
