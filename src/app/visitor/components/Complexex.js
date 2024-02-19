"use client";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import ApiService from "@/app/Infraestructure/axios";

export function Complexex({ control, errors }) {
  const [blockNumber, setBlockNumber] = useState([]);
  const [unit, setUnit] = useState([]);
  const fetchBlocksAndUnits = async () => {
    try {
      const { data } = await ApiService.get("/residents/units/");
      setBlockNumber(data);
      const blocks = [];
      const unitsAux = [];

      if (data.results.length) {
        data?.results?.map((item) => {
          blocks.push(item.block);
        });
        setBlockNumber(blocks);

        data?.results?.map(({ id, unit_number }) => {
          unitsAux.push({ id, unit_number });
        });
        setUnit(unitsAux);
      }
    } catch (error) {
      console.error("Error al obtener bloques:", error);
    }
  };

  useEffect(() => {
    fetchBlocksAndUnits();
  }, []);

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
                error={!!errors.name}
                helperText={errors?.name?.message}
                label="Torre"
                autoFocus
                id="block"
                variant="outlined"
                fullWidth
                required
                select
                size="small"
                onChange={(e) => {
                  field.onChange(e);
                }}
              >
                {blockNumber.map((block) => (
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
            name="unit_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-4 bg-slate-100 rounded-lg"
                error={!!errors.unit_id}
                helperText={errors?.unit_id?.message}
                label="Número de apartamento"
                autoFocus
                id="unit_id"
                variant="outlined"
                fullWidth
                required
                size="small"
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
        <Grid item xs={12} md={4}>
          <Controller
            name="delivery"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Domiciliario"
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}
