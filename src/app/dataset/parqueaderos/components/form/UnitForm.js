import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, Typography, styled, Modal } from "@mui/material";
import ApiService from "@/app/Infraestructure/axios";
import * as yup from "yup";
import LottieLoader from "@/app/components/lottie-loader/LottieLoader";
import MessageToast from "@/app/components/toast/MessageToast";
import MessageToastConfirm from "@/app/components/toast/MessageToastConfirm";

export default function UnitForm({ onOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 10,
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      block: "",
      unit_number: "",
      coefficient: "",
      complexex_id: 1,
    },
    resolver: yupResolver(
      yup.object().shape({
        complexex: yup.array().of(
          yup.object().shape({
            block: yup.string().required("Este campo es obligatorio"),
            unit_number: yup.string().required("Este campo es obligatorio"),
            coefficient: yup.string().required("Este campo es obligatorio"),
          })
        ),
      })
    ),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await ApiService.post("/residents/units/", {
        ...values,
        complexex_id: 1,
      });
      reset();
      setConfirmMessage("Guardado exitosamente");
    } catch (error) {
      setErrorMessage(
        "Error al validar el usuario. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
      console.log(loading);
    }
  };

  return (
    <form
      className="contactForm-container-custom"
      name="contactForm"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Modal
        className="rounded-full"
        open={onOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={12}>
              <Grid item xs={12} md={12} padding={5}>
                <Typography
                  className="card-header-custom text-violet-950 font-bold text-center"
                  variant="h6"
                >
                  Registro de unidades
                </Typography>
                <Typography className="text-center">
                  Al diligenciar el formulario tenga en cuenta que los campos
                  marcados con (*), son de carácter obligatorio
                </Typography>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  margin={0}
                  padding={0}
                >
                  <Grid item xs={12} md={12}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12} md={3}>
                        <Controller
                          name="tipo"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mt-4 mb-4"
                              error={!!errors.tipo}
                              helperText={errors?.tipo?.message}
                              label="Tipo"
                              autoFocus
                              id="tipo"
                              variant="outlined"
                              fullWidth
                              required
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Controller
                          name="block"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              error={!!errors.block}
                              helperText={errors?.block?.message}
                              label="Unidad"
                              className="mt-4 mb-4"
                              autoFocus
                              id="block"
                              variant="outlined"
                              fullWidth
                              required
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Controller
                          name="coefficient"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              error={!!errors.coefficient}
                              helperText={errors?.coefficient?.message}
                              label="Piso"
                              autoFocus
                              className="mt-4 mb-4"
                              id="coefficient"
                              variant="outlined"
                              fullWidth
                              required
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Controller
                          name="unit_number"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mt-4 mb-4"
                              error={!!errors.unit_number}
                              helperText={errors?.unit_number?.message}
                              label="Apartamento"
                              autoFocus
                              id="unit_number"
                              variant="outlined"
                              fullWidth
                              required
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        className="pt-4"
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={12} md={12} align="center">
                          <Button
                            type="button"
                            className="bg-violet-950 mr-2 rounded-full p-2 normal-case"
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                          >
                            Guardar
                          </Button>
                          <Button
                            className="bg-violet-950 rounded-full p-2 normal-case text-white"
                            onClick={onClose}
                          >
                            Cancelar
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <LottieLoader show={loading} />
            {confirmMessage && (
              <MessageToastConfirm
                message={errorMessage}
                onClose={() => setConfirmMessage(null)}
              />
            )}
            {errorMessage && (
              <MessageToast
                message={errorMessage}
                onClose={() => setErrorMessage(null)}
              />
            )}
          </Grid>
        </Box>
      </Modal>
    </form>
  );
}
