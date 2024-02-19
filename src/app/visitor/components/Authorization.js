import { CardContent, Divider, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export default function Authorization({ control, errors }) {
    return (
        <div>
            <CardContent>
                <Typography className="subTittlesAppTwoAuth text-center mb-4">Datos para autorización</Typography>
                <Divider className="border-t-2 border-gray-500 mb-4" orientation="horizontal" flexItem />
            </CardContent>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <Controller
                        name='phone_number'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="custom-textfield mb-4 bg-slate-100 rounded-lg"
                                label="Teléfono contacto"
                                helperText={errors?.phone_number?.message}
                                error={!!errors.phone_number}
                                autoFocus
                                id="phone_number"
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
                <Grid item xs={12} md={6}>
                    <Controller
                        name='resident_id'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="custom-textfield mb-4 bg-slate-100 rounded-lg"
                                label="Quién autoriza"
                                autoFocus
                                helperText={errors?.resident_id?.message}
                                error={!!errors.resident_id}
                                id="resident_id"
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
            </Grid>
        </div>
    )
}