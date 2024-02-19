import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Bicicleta from "@/app/assets/images/icono-bicicletas.png";
import DeleteIcon from "@mui/icons-material/Delete";
import {} from "./../style/residents.css";

export const Cycle = forwardRef(function Cycle(
  { control, errors, fields, remove, append },
  ref
) {
  const [color, setColor] = useState([]);
  const [brand, setBrand] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    axios
      .get("http://172.174.120.216:8000/biciparkingLite/Color/")
      .then((response) => {
        console.log(response.data);
        setColor(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los colores:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://172.174.120.216:8000/biciparkingLite/Brand/")
      .then((response) => {
        console.log(response.data);
        setBrand(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las marcas", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://172.174.120.216:8000/biciparkingLite/BikeType/")
      .then((response) => {
        console.log(response.data);
        setType(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de bicicletas", error);
      });
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        className="mb-4"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} md={4} align="center">
          <Image src={Bicicleta} alt="logo vehiculo" width={100} height={100} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className="subTittlesApp">
            REGISTRO DE BICICLETAS
          </Typography>
          <Typography className="text-center text-xs">
            En esta sección registre las bicicletas a relacionar al inmueble.
          </Typography>
        </Grid>
      </Grid>
      {fields.map((item, index) => (
        <section key={item.id} className="mb-4">
          <Grid container spacing={{ xs: 2, md: 3 }} key={index}>
            <Grid item xs={12} md={3}>
              <Controller
                name={`cycles.${index}.bycle_type_id`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-4 bg-slate-100 rounded-lg"
                    error={!!errors?.vehicles?.[index]?.bycle_type_id}
                    helperText={
                      errors?.vehicles?.[index]?.bycle_type_id?.message
                    }
                    label="Tipo"
                    autoFocus
                    id="type_id"
                    variant="outlined"
                    fullWidth
                    select
                    size="small"
                  >
                    {type &&
                      type.results &&
                      type.results.map((type) => (
                        <MenuItem
                          key={type.bike_type_id}
                          value={type.bike_type_id}
                        >
                          {type.bike_type}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                name={`cycles.${index}.brand_id_cycle`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-4 bg-slate-100 rounded-lg"
                    error={!!errors?.vehicles?.[index]?.brand_id_cycle}
                    helperText={
                      errors?.vehicles?.[index]?.brand_id_cycle?.message
                    }
                    label="Marca"
                    autoFocus
                    id="brand_id_cycle"
                    variant="outlined"
                    fullWidth
                    size="small"
                    select
                    InputProps={{
                      classes: {
                        icon: "custom-select-arrow",
                      },
                    }}
                  >
                    {brand &&
                      brand.results &&
                      brand.results.map((brand) => (
                        <MenuItem key={brand.brand_id} value={brand.brand_id}>
                          {brand.brand}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Controller
                name={`cycles.${index}.bike_serial_id`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-4 bg-slate-100 rounded-lg"
                    error={!!errors?.vehicles?.[index]?.bike_serial_id}
                    helperText={
                      errors?.vehicles?.[index]?.bike_serial_id?.message
                    }
                    label="Serial"
                    autoFocus
                    id="bike_serial_id"
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Controller
                name={`cycles.${index}.color_id`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-4 bg-slate-100 rounded-lg"
                    error={!!errors?.vehicles?.[index]?.color_id}
                    helperText={errors?.vehicles?.[index]?.color_id?.message}
                    label="Color"
                    autoFocus
                    id="color_id"
                    variant="outlined"
                    fullWidth
                    select
                    size="small"
                  >
                    {color &&
                      color.results &&
                      color.results.map((color) => (
                        <MenuItem key={color.color_id} value={color.color_id}>
                          {color.color}
                        </MenuItem>
                      ))}
                  </TextField>
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
        </section>
      ))}
    </div>
  );
});
