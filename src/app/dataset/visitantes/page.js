"use client";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ApiService from "@/app/Infraestructure/axios";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import {
  Card,
  CardContent,
  Divider,
  Typography,
  Pagination,
} from "@mui/material";

import {} from "../style/style.css";
import SearchBar from "../unidades/components/search/Searcher";

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const ODD_OPACITY = 0.2;

export default function ListVisitor() {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const getData = async (value = "") => {
    try {
      const { data } = await ApiService.get(
        `/visitors/visitor/searcher/?search=${value}&page=${page}`
      );
      setResult(data?.results|| []);
      setTotalPages(Math.ceil(data.count / pageSize));
      reset();
    } catch (error) {
      console.error("Error al obtener la unidad:", error);
    }
  };
  const handleSearchDebounced = _.debounce(getData, 1000);
  useEffect(() => {
    getData();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
    },
    {
      field: "subname",
      headerName: "Apellido",
      width: 200,
    },
    {
      field: "doc_id",
      headerName: "Numero de documento",
      width: 200,
    },
    {
      field: "delivery",
      headerName: "Domiciliario",
      width: 200,
      renderCell: (params) => <div>{params.value ? "Sí" : "No"}</div>,
    },
    {
      field: "resident_id",
      headerName: "Quien autoriza",
      width: 200,
    },
    {
      field: "plate",
      headerName: "Placa de vehículo",
      width: 200,
    },
    {
      field: "unit_info",
      headerName: "Torre y apartamento",
      width: 200,
      renderCell: (params) => {
        const { block, unit_number } = params.row.unit_info || {};
        return `${block} - ${unit_number}`;
      },
    },
  ];
  return (
    <div className="flex justify-center pt-500">
      <Card sx={{ width: 1000, height: "auto" }} className="card-units">
        <div className="content-up pl-5 pr-5 pt-5">
          <Typography className="font-semibold text-xl pt-2">
            Visitantes registrados
          </Typography>
          <SearchBar search={handleSearchDebounced} />
        </div>
        <Divider className="mt-4" />
        <CardContent sx={{ height: 400 }}>
          <StripedDataGrid
            rows={result}
            columns={columns}
            pagination
            pageSize={pageSize}
            rowCount={totalPages}
            paginationMode="server"
            autoHeight
            onPageChange={(newPage) => setPage(newPage)}
            getRowId={(row) => row.id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            className="border-none"
            sx={{
              ".MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold !important",
                overflow: "visible !important",
              },
            }}
            components={{
              Pagination: (props) => (
                <Pagination
                  {...props}
                  count={totalPages}
                  page={page}
                  onChange={(e, newPage) => setPage(newPage)}
                />
              ),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
