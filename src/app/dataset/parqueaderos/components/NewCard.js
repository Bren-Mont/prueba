import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import {
  Box,
  Button,
  Grid,
  Link,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import {} from "../../style/style.css";
import ApiService from "@/app/Infraestructure/axios";
import LottieLoader from "@/app/components/lottie-loader/LottieLoader";
import MessageToast from "@/app/components/toast/MessageToast";
import MessageToastConfirm from "@/app/components/toast/MessageToastConfirm";

export default function NewCard({ onOpenMultiple, onCloseMultiple }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 6,
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadExcel = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const data = event.target.result;

        const workbook = XLSX.read(data, {
          type: "binary",
        });

        workbook.SheetNames.forEach((sheet) => {
          const rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          setJsonData(rowObject);
        });
      };
      fileReader.readAsBinaryString(selectedFile);
    }
  };

  const save = async () => {
    try {
      setLoading(true);

      if (jsonData?.length) {
        const response = jsonData?.map((item) => {
          const body = {
            block: item.UNIDAD,
            unit_number: item.APARTAMENTO,
            coefficient: item.PISO,
            complexex_id: 1,
          };
          return ApiService.post("/residents/units/", body);
        });
        const result = await Promise.all(response);
        setConfirmMessage("Guardado exitosamente");
      }
    } catch (error) {
      setErrorMessage(
        "Error al validar el usuario. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
      console.log(loading);
    }
  };

  useEffect(() => {
    save();
  }, [jsonData]);

  return (
    <div>
      <Modal
        className="rounded-full"
        open={onOpenMultiple}
        onClose={onCloseMultiple}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Link className="text-sm -mt-8 pb-8 flex justify-center" href="#">
            Descargar plantilla Excel de carga
          </Link>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            className="flex justify-center rounded-full"
          ></Grid>
          <input
            className="mb-4"
            type="file"
            id="fileUpload"
            accept=".xls, xlsx"
            onChange={handleFileChange}
          />
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} md={12} align="center">
              <Button
                className="new-button mr-2 rounded-full p-2 normal-case"
                onClick={handleUploadExcel}
              >
                Guardar
              </Button>
              <Button
                className="new-button rounded-full normal-case"
                onClick={onCloseMultiple}
              >
                Cancelar
              </Button>
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
    </div>
  );
}
