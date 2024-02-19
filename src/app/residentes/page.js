"use client";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import "@/app/globals.css";
import "./style/residents.css";
import * as yup from "yup";
import { DateTime } from "luxon";
import {Cycle} from "./components/Cycle";
import {Vehicles} from "./components/Vehicles";
import Complexex  from "./components/Complexex";
import ApiService from "@/app/Infraestructure/axios";
import Banner from "@/app/assets/images/banner-visitantes.png";
import Logo from "@/app/assets/images/logo-toscana.jpeg";
import Owners  from "@/app/residentes/components/Owners";
import { ResidentsData } from "./components/ResidentsData";
import LottieLoader from "@/app/components/lottie-loader/LottieLoader";
import MessageToast from "@/app/components/toast/MessageToast";
import MessageToastConfirm from "@/app/components/toast/MessageToastConfirm";


const URL_BASE = "http://127.0.0.1:8000/residents";

export default function Residents() {
    
  const params = useParams();
  const [open, setOpen] = useState(false);
  const refResidentData = useRef(null);
  const refCycle = useRef(null);
  const refVehicles = useRef(null);
  const [hashedId, setHashedId] = useState("");
  const [complexex, setComplexex] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);

  
  const { id } = useParams(); 
  const complexexAux = async () => {
    try {
      const { data } = await ApiService.get("/residents/complexex/");
      setComplexex(data.results);
      console.log('conjunto',data);
    } catch (error) {
      console.error("Error al obtener el conjunto:", error);
    }
  };
  
  useEffect(() => {
    complexexAux();
  }, []);
  
  const generateHashedURL = () => {

      const crypto = window.crypto || window.msCrypto;
      if (crypto.subtle) {
        crypto.subtle.digest('SHA-256', new TextEncoder().encode(id))
          .then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashedId = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            window.history.pushState({}, '', `/residentes/#${hashedId}/`);
            console.log('id', id);
          })
          .catch(error => console.error("Error hashing:", error));
      } else {
        console.error("SubtleCrypto not available");
      
    }
  };
  useEffect(() => {
  
    generateHashedURL();
  }, []);
  

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        owners: yup.array().of(
          yup.object().shape({
            name: yup.string().required("Este campo es obligatorio"),
            tax_id_type: yup.string().required("Este campo es obligatorio"),
            tax_id: yup.number().required("Este campo es obligatorio"),
            phone_number: yup.number().required("Este campo es obligatorio"),
            email: yup.string().email('Ingrese un correo electrónico válido').required("Este campo es obligatorio"),
            // birthdate: yup.string().required('Este campo es obligatorio'),
          })
          ),
       
          complexex: yup.array().of(
            yup.object().shape({
              block: yup.string().required("Este campo es obligatorio"),
              unit_number: yup.string().required("Este campo es obligatorio"),
              floor: yup.number().required("Este campo es obligatorio"),
            })
            ),
          residents: yup.array().of(
          yup.object().shape({
            name: yup.string().required("Este campo es obligatorio"),
            tax_id_type: yup.string().required("Este campo es obligatorio"),
            email: yup.string().email('Ingrese un correo electrónico válido').required("Este campo es obligatorio"),
            tax_id: yup.number().required("Este campo es obligatorio"),
            // birthdate: yup.string().required('Este campo es obligatorio'),
          })
        ),
        vehicles: yup.array().of(
          yup.object().shape({
            plate_id: yup.string().required("Este campo es obligatorio"),
            house_id: yup.string().required("Este campo es obligatorio"),
            model: yup.number().required("Este campo es obligatorio"),
            brand_id: yup.string().required("Este campo es obligatorio"),
            vehicle_type_id: yup.string().required("Este campo es obligatorio"),
          })
        ),
        cycles: yup.array().of(
          yup.object().shape({
            bycle_type_id: yup.string().required("Este campo es obligatorio"),
            brand_id_cycle: yup.string().required("Este campo es obligatorio"),
            bike_serial_id: yup.number().required("Este campo es obligatorio"),
            color_id: yup.string().required("Este campo es obligatorio"),
          })
        ),
      })
    ),
    defaultValues: {
      owners: [
        {
          name: "",
          tax_id: null,
          tax_id_type: "",
          birthdate: "",
          phone_number:null,
          email:""
        },
      ],
      residents: [
        {
          name: "",
          tax_id: null,
          tax_id_type: "",
          birthdate: "",
        },
      ],
  
      vehicles: [
        {
          plate_id: "",
          house_id: "",
          model: null,
          brand_id: "",
          vehicle_type_id: "",
        },
      ],
      
      cycles: [
        {
          bycle_type_id: "",
          brand_id_cycle: "",
          bike_serial_id: null,
          color_id: "",
        },
      ],
      complexex: [
        {
          block: "",
          unit_number: "",
          floor: null,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "residents",
  });
  const fieldVehicles = useFieldArray({
    control,
    name: "vehicles",
  });
  const fieldCycles = useFieldArray({
    control,
    name: "cycles",
  });

  const saveComplexex = async (data) => {
    const promiseComplexexSave = data.complexex.map((item) => {
      const data = {
        ...item,
        project_id: "Almeira",
        name: "conjunto",
      };
      return ApiService.post("/residents/units/", data);

    });
    await Promise.all(promiseComplexexSave);
  };

  const saveOwner = async (data) => {
    const promiseOwner = data.residents.map((item) => {
      let birthdate = item.birthdate.$d;
      birthdate = DateTime.fromJSDate(birthdate).toLocal().toISODate();
      const data = {
        ...item,
        birthdate,
      };
      return ApiService.post("/residents/residents/", data);
    });
    await Promise.all(promiseOwner);
  };

  const saveResidentsData = async (data) => {
    let { unit_number } = getValues();
    unit_number = JSON.parse(unit_number || "{}")?.id;

    const promiseResidents = data.residents.map((item) => {
      let birthdate = item.birthdate.$d;
      birthdate = DateTime.fromJSDate(birthdate).toLocal().toISODate();
      const data = {
        ...item,
        birthdate,
        unit_number: unit_number,
      };
      return ApiService.post("/residents/owners/", data);
    });
    await Promise.all(promiseResidents);
  };

  const saveVehiclesData = async (data) => {
    const promiseVehiclesSave = data.vehicles.map((item) => {
      return ApiService.post("vehicles/vehiclex/", data);
    });
    await Promise.all(promiseVehiclesSave);
  };
  const saveCycleData = async (data) => {
    const promiseCycleSave = data.vehicles.map((item) => {
      return ApiService.post("/biciparking/bike/", data);
    });
    await Promise.all(promiseCycleSave);
  };

  const saveContacts = async (data) => {
    let contact_data = {};
    if (data.principal === "No") {
      contact_data = {
        name: data.name_contact,
        tax_id_type: data.tax_id_type_contact,
        tax_id: data.tax_id_contact,
        phone_number: data.phone_number_contact,
        email: data.email_contact,
        birthdate: data.birthdate_contact,
        unit_number: 1,
      };
    }
    await axios.post(`${URL_BASE}/owners/`, contact_data);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await saveComplexex(data);
      await saveOwner(data);
      await saveContacts(data);
      await saveResidentsData(data);
      await saveVehiclesData(data);
      await saveCycleData(data);

      setConfirmMessage('Guardado exitosamente')
    } catch (error) {
      setErrorMessage(
        "Error al validar el usuario. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form name="residents" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={12}>
          <Image
            src={Banner}
            alt="banner"
            width="100%"
            height="100%"
            layout="responsive"
            style={{
              objectFit: "cover",
            }}
          />
          <Container maxWidth="md" className="z-50 container-residents pb-8">
            <Card className="card-custom mx-8 bg-white pl-8 pt-8 pr-8 pb-8 ">
              <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={4}>
                  <Image
                    src={Logo}
                    alt="logo toscana"
                    width={170}
                    height={130}
                  />

                  <Divider orientation="vertical" flexItem />
                </Grid>
                <Grid item xs={12} md={8} className="bg-red">
                  <Typography className="tittlesApp">
                    FORMULARIO ACTUALIZACIÓN DE DATOS DE RESIDENTES
                  </Typography>
                </Grid>
              </Grid>
              <CardContent>
                <Typography className="text-center text-xs mb-4">
                  Por medio del presente formulario la Administración del
                  conjunto residencial LUCCA LA TOSCANA, desea actualizar la
                  base de datos de residentes, con el fin de facilitar la
                  implementación y activación de las nuevas herramientas
                  tecnológicas de seguridad que se usarán de ahora en adelante
                  en las intalaciones residenciales.
                </Typography>
                <Typography className="text-center text-xs mb-4">
                  Agradecemos su amable colaboración, los campos señalados con
                  asterisco (*) son de caracter obligatorio.
                </Typography>
              </CardContent>

              <Owners control={control} errors={errors} />
              <Complexex control={control} errors={errors} />
              <ResidentsData
                control={control}
                errors={errors}
                ref={refResidentData}
                fields={fields}
                append={append}
                remove={remove}
              />
              <Vehicles
                control={control}
                errors={errors}
                ref={refResidentData}
                fields={fieldVehicles.fields}
                append={fieldVehicles.append}
                remove={fieldVehicles.remove}
              />
              <Cycle
                control={control}
                errors={errors}
                ref={refResidentData}
                fields={fieldCycles.fields}
                append={fieldCycles.append}
                remove={fieldCycles.remove}
              /> 
            <div className="button-send">
                <Button
                  className="color-button"
                  variant="outlined"
                  type="submit"
                >
                  Enviar{" "}
                </Button>
              </div>
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
            </Card>
          </Container>
          
        </Grid>
      </Grid>
    </form>
  );
}
