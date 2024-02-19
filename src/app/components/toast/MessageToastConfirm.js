import * as React from "react";
import { Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function MessageToastConfirm() {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      className="pt-4"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} md={12} >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Se ha guardado correctamente.
        </Alert>
      </Grid>
    </Grid>
  );
}
