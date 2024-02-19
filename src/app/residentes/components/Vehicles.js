import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { forwardRef, useImperativeHandle } from "react";
import {
  Button,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import {} from "./../style/residents.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Vehiculo from "@/app/assets/images/icono-autos-8.png";
import ApiService from "@/app/Infraestructure/axios";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import NumericFormatCustom from "@/app/components/numeric-format/NumericFormat";

const brand = [
  { description: "Chevrolet", id: 1 },
  { description: "Seat", id: 2 },
  { description: "Renault", id: 3 },
];
const type = [
  { description: "Moto", id: 1 },
  { description: "Carro", id: 2 },
];

export const Vehicles = forwardRef(function Vehicles(
  { control, errors, fields, remove, append },
  ref
) {
  const [vehiclesType, setVehiclesType] = useState();
  const [vehiclesBrand, setVehiclesBrand] = useState();
  const vehiclesTypeAux = async () => {
    try {
      const { data } = await ApiService.get("/vehicles/vehicle_type/");
      setVehiclesType(data.results);
    } catch (error) {
      console.error("Error al obtener bloques:", error);
    }
  };
  const vehiclesBrandAux = async () => {
    try {
      const { data } = await ApiService.get("/vehicles/vehicleBrand/");
      setVehiclesBrand(data.results);
    } catch (error) {
      console.error("Error al obtener bloques:", error);
    }
  };

  useEffect(() => {
    vehiclesTypeAux();
  }, []);
  useEffect(() => {
    vehiclesBrandAux();
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
          <Image src={Vehiculo} alt="logo vehiculo" width={100} height={100} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography className="subTittlesApp">
            REGISTRO DE VEHÍCULOS
          </Typography>
          <Typography className="text-center text-xs">
            En esta sección registre vehículos a relacionar al inmueble.
          </Typography>
        </Grid>
      </Grid>
      {fields.map((item, index) => (
        <section key={item.id} className="mb-4">
          <Grid container spacing={{ xs: 2, md: 3 }} key={index}>
            <Grid item xs={12} md={2.5}>
              <Controller
                name={`vehicles.${index}.vehicles_type_id`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-4 bg-slate-100 rounded-lg"
                    error={!!errors?.vehicles?.[index]?.vehicles_type_id}
                    helperText={
                      errors?.vehicles?.[index]?.id?.message
                    }
                    label="Tipo"
                    autoFocus
                    id="vehicles_type_id"
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    value={JSON.stringify(field.value)}
                    select
                  >
                    {vehiclesType?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Controller
                name={`vehicles.${index}.brand_id`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-4 bg-slate-100 rounded-lg"
                    label="Marca"
                    autoFocus
                    error={errors?.vehicles?.[index]?.brand_id}
                    helperText={errors?.vehicles?.[index]?.brand_id?.message}
                    id="brand_id"
                    variant="outlined"
                    fullWidth
                    required
                    select
                    size="small"
                  >
                    {vehiclesBrand?.map((item) => (
                      <MenuItem id={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Controller
                name={`vehicles.${index}.model`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-4 bg-slate-100 rounded-lg"
                    error={!!errors?.vehicles?.[index]?.model}
                    helperText={errors?.vehicles?.[index]?.model?.message}
                    label="Módelo"
                    autoFocus
                    id="model"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Controller
                name={`vehicles.${index}.plate_id`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-4 bg-slate-100 rounded-lg"
                    error={!!errors?.vehicles?.[index]?.message}
                    helperText={!!errors?.vehicles?.[index]?.plate_id?.message}
                    label="Placa"
                    autoFocus
                    id="plate_id"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Controller
                name={`vehicles.${index}.house_id`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-4 bg-slate-100 rounded-lg"
                    error={!!errors?.vehicles?.[index]?.house_id}
                    helperText={errors?.vehicles?.[index]?.house_id?.message}
                    label="Parqueadero"
                    autoFocus
                    id="house_id"
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    nChange={(e) => {
                      field.onChange(e);
                      onChangeRows(index, e.target.value, "house_id");
                      console.log(rows);
                    }}
                    InputProps={{
                      inputComponent: NumericFormatCustom,
                    }}
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
        </section>
      ))}
    </div>
  );
});
