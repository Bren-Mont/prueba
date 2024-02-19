"use client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid, MenuItem, TextField } from "@mui/material";

import {} from "./../style/residents.css";
import ApiService from "@/app/Infraestructure/axios";
import NumericFormatCustom from "@/app/components/numeric-format/NumericFormat";
import { Contact } from "./Contact";

export default function Complexex({ control, errors }) {
  const [showContact, setShowContact] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [blockNumber, setBlockNumber] = useState([]);
  const [unit, setUnit] = useState([]);
  const [floor, setFloor] = useState([]);
  const fetchBlocksAndUnits = async () => {
    try {
      const { data } = await ApiService.get("/residents/units/");
      setBlockNumber(data);
      const blocks = [];
      const unitsAux = [];
      const floorAux = [];

      if (data.results.length) {
        data?.results?.map((item) => {
          blocks.push(item.block);
        });
        setBlockNumber(blocks);
        console.log("blocks", data);

        data?.results?.map(({ id, unit_number }) => {
          unitsAux.push({ id, unit_number });
        });
        setUnit(unitsAux);

        data?.results?.map((item) => {
          floorAux.push(item.floor);
        });
        setFloor(floorAux);
      }
    } catch (error) {
      console.error("Error al obtener bloques:", error);
    }
  };

  useEffect(() => {
    fetchBlocksAndUnits();
  }, []);
  const handlePropietarioChange = (e) => {
    const isPropietario = e.target.value === "No";
    setPrincipal(isPropietario);
    setShowContact(isPropietario);
  };
  const esPropietario = principal === "No";
  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={4}>
          <Controller
            name="block"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                error={!!errors.block}
                helperText={errors?.block?.message}
                label="Torre"
                autoFocus
                id="block"
                size="small"
                variant="outlined"
                fullWidth
                required
                select
                onChange={(e) => {
                  field.onChange(e);
                }}
              >
                {blockNumber?.map((block) => (
                  <MenuItem key={block} value={block}>
                    {block}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="floor"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                error={!!errors.name}
                helperText={errors?.name?.message}
                label="Piso Número"
                autoFocus
                id="floor"
                variant="outlined"
                fullWidth
                size="small"
                required
                select
                onChange={(e) => {
                  field.onChange(e);
                }}
                InputProps={{
                  inputComponent: NumericFormatCustom,
                }}
              >
                
                {floor.map((floor) => (
                  <MenuItem key={floor} value={floor}>
                    {floor}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="unit_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                error={!!errors.unit_number}
                helperText={errors?.unit_number?.message}
                label="Número de apartamento"
                autoFocus
                id="unit_number"
                variant="outlined"
                size="small"
                fullWidth
                required
                select
                onChange={(e) => {
                  field.onChange(e);
                }}
              >
                {unit.map((units) => (
                  <MenuItem key={units.id} value={units.id}>
                    {units.unit_number}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} alignContent='center' justifyContent='center'>
        <Grid item xs={12} md={4}>
          <Controller
            name="principal"
            control={control}
            size="small"
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                error={!!errors.principal}
                helperText={errors?.principal?.message}
                label="¿Eres propietario?"
                autoFocus
                select
                id="principal"
                variant="outlined"
                fullWidth
                size="small"
                required
                onChange={(e) => {
                  field.onChange(e);
                  handlePropietarioChange(e);
                }}
              >
                <MenuItem value="Sí">Sí</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      {showContact && <Contact control={control} errors={errors} />}
    </div>
  );
}
