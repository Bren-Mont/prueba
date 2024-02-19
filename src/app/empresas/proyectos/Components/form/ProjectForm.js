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

export default function ProjectForm({ onOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [client, setClient] = useState([]);
  const [cities, setCities] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
      user_id: "",
      name: "",
      city: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        project: yup.array().of(
          yup.object().shape({
            user_id: yup.string().required("Este campo es obligatorio"),
            name: yup.string().required("Este campo es obligatorio"),
          })
        ),
      })
    ),
  });

  const getClient = async () => {
    try {
      const { data } = await ApiService.get("/users/users/");
      setClient(data.results);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };
  const getCities = async () => {
    try {
      const { data } = await ApiService.get("/users/cities/");
      setCities(data.results);
    } catch (error) {
      console.error("Error al obtener ciudades:", error);
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  useEffect(() => {
    getCities();
  }, []);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await ApiService.post("/users/project/", {
        ...values,
        image: null
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
      enctype="multipart/form-data"
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
            <Grid item xs={12} md={6}>
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-4 mb-4"
                    error={!!errors.user_id}
                    helperText={errors?.user_id?.message}
                    label="Cliente"
                    autoFocus
                    id="user_id"
                    variant="outlined"
                    fullWidth
                    required
                    select
                  >
                    {client?.map?.((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    label="Proyecto"
                    className="mt-4 mb-4"
                    autoFocus
                    id="name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={6}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.city}
                    helperText={errors?.city?.message}
                    label="Ciudad"
                    autoFocus
                    className="mt-4 mb-4"
                    id="city"
                    variant="outlined"
                    fullWidth
                    required
                    select
                  >
                    {cities?.map?.((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    <label className="font-semibold">Logo</label>
                    <input
                      {...field}
                      className="mt-2"
                      name="file"
                      type="file"
                      id="fileUpload"
                      accept="jpg, png, jpeg"
                    />
                  </>
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
                  Registrar
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
        </Box>
      </Modal>
    </form>
  );
}
