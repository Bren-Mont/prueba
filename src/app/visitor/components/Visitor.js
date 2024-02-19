import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import ApiService from "@/app/Infraestructure/axios";
import NumericFormatCustom from "@/app/components/numeric-format/NumericFormat";

export default function VisitorComponent({ control, errors }) {
  const [vehicles, setVehicles] = useState();
  const [isVehicleChecked, setIsVehicleChecked] = useState(true);

  const vehiclesVisitor = async () => {
    try {
      const { data } = await ApiService.get("/vehicles/vehicle_type/");
      setVehicles(data.results);
    } catch (error) {
      console.error("Error al obtener bloques:", error);
    }
  };

  useEffect(() => {
    vehiclesVisitor();
  }, []);

  const handleVehicleCheckboxChange = (event) => {
    setIsVehicleChecked(event.target.checked);
  };

  return (
    <div>
      <CardContent>
        <Typography className="subTittlesAppTwoAuth text-center mb-4">
          Registro de visitante
        </Typography>
        <Divider
          className="border-t-2 border-gray-500 mb-4"
          orientation="horizontal"
          flexItem
        />
      </CardContent>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={3}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="custom-textfield mb-4 bg-slate-100 rounded-lg"
                helperText={errors?.name?.message}
                error={!!errors.name}
                label="Nombres"
                autoFocus
                id="name"
                size="small"
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
            name="subname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="custom-textfield mb-4 bg-slate-100 rounded-lg"
                helperText={errors?.surname?.message}
                error={!!errors.surname}
                label="Apellidos"
                autoFocus
                id="surname"
                variant="outlined"
                fullWidth
                required
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="doc_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="custom-textfield mb-4 bg-slate-100 rounded-lg"
                helperText={errors?.doc_id?.message}
                error={!!errors.doc_id}
                label="Numero de cédula"
                autoFocus
                id="doc_id"
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
            name="gender"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="custom-textfield mb-4 bg-slate-100 rounded-lg"
                helperText={errors?.gender?.message}
                error={!!errors.gender}
                label="Genero"
                autoFocus
                id="gender"
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
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={3}>
          <Controller
            name=""
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  {...field}
                  control={<Checkbox 
                  checked={isVehicleChecked}
                  onChange={handleVehicleCheckboxChange} />}
                  label="Vehículo"
                />
              </FormGroup>
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="type_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                helperText={errors?.type_id?.message}
                error={!!errors.type_id}
                label="Tipo"
                autoFocus
                size="small"
                id="type_id"
                variant="outlined"
                fullWidth
                required
                select
                disabled={!isVehicleChecked}
              >
                {vehicles?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Controller
            name="plate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                helperText={errors?.plate?.message}
                error={!!errors.plate}
                label="Placa"
                autoFocus
                id="plate"
                variant="outlined"
                fullWidth
                size="small"
                required
                disabled={!isVehicleChecked}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="house_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                helperText={errors?.house_id?.message}
                error={!!errors.house_id}
                label="Parqueadero"
                autoFocus
                id="house_id"
                variant="outlined"
                fullWidth
                size="small"
                disabled={!isVehicleChecked}
                InputProps={{
                  inputComponent: NumericFormatCustom,
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}
