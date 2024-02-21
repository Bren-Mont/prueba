import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NewCard from "./NewCard";
import SearchBar from "./search/Searcher";
import ApiService from "@/app/Infraestructure/axios";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import UnitForm from "./form/UnitForm";
import AddIcon from "@mui/icons-material/Add";
import {} from "../../style/style.css";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { debounce } from "lodash";
import ModalDelete from "@/app/components/modal/modal";

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

export default function ListUnitParking() {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [showCard, setShowCard] = useState(false);
  const [showCardMultiple, setShowCardMultiple] = useState(false);
  const [result, setResult] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const getData = async (value = "") => {
    try {
      const { data } = await ApiService.get(
        `/residents/units/searcher/?search=${value}&page=${page}`
      );
      setResult(data?.results || []);
      setTotalPages(Math.ceil(data.count / pageSize));
      reset();
    } catch (error) {
      console.error("Error al obtener la unidad:", error);
    }
  };

  const handleSearchDebounced = _.debounce(getData, 1000);

  const deleteRows = (id) => {
    setDeleteModal(true);
    const rows = result.filter((row) => row.id !== id);
    setResult(rows);
  };
  useEffect(() => {
    getData();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleOpen = () => {
    setShowCard(true);
  };

  const handleClose = () => {
    setShowCard(false);
  };
  const handleOpenMultiple = () => {
    setShowCardMultiple(true);
  };

  const handleCloseMultiple = () => {
    setShowCardMultiple(false);
  };
  const handleOpenModal = () => {
    setOpenModal(false);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const columns = [
    {
      field: "type",
      headerName: "Tipo",
      type: "image",
      width: 200,
      value: "Apartamento",
    },
    {
      field: "block",
      headerName: "Unidad",
      width: 200,
    },
    {
      field: "floor",
      headerName: "Piso",
      width: 200,
    },
    {
      field: "unit_number",
      headerName: "# Apartamento",
      width: 200,
    },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 150,
      renderCell: (params) => {
        const onClick = (e) => {
          deleteRows(params.row.id);
        };

        return (
          <IconButton onClick={onClick}>
            <ClearIcon style={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];
  return (
    <div className="flex justify-center pt-500">
      <Card sx={{ width: 1000, height: "auto" }} className="card-units">
        <div className="content-up pl-5 pr-5 pt-3">
          <Typography className="font-semibold text-xl pt-2 ">
            Parqueaderos registrados
          </Typography>
          <SearchBar search={handleSearchDebounced} />
          <div className="justify-center items-center -mt-1">
            <Button
              className="m-2 rounded-full text-white normal-case pr-5 hover:bg-sky-400"
              onClick={handleOpen}
              style={{backgroundColor:'#333366'}}
            >
              <AddIcon className="mr-2 " />
              Nueva unidad
            </Button>
            {showCard && <UnitForm onOpen={handleOpen} onClose={handleClose} />}
            <Button
              className="m-2 rounded-full text-white normal-case pr-5 hover:bg-sky-400 "
              onClick={handleOpenMultiple}
              style={{backgroundColor:'#333366'}}
            >
              <AddIcon className="mr-2" />
              Carga masiva
            </Button>
            {showCardMultiple && (
              <NewCard
                onOpenMultiple={handleOpenMultiple}
                onCloseMultiple={handleCloseMultiple}
              />
            )}
          </div>
        </div>
        <Divider />
        <CardContent sx={{ maxHeight: 600 }}>
          <StripedDataGrid
            rows={result}
            columns={columns}
            pagination
            pageSize={pageSize}
            rowCount={totalPages * pageSize} 
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            getRowId={(row) => row.block + row.unit_number}
            autoHeight
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
         
          {/* <ModalDelete onOpen={handleOpenModal} onClose={handleCloseModal} deleteRows={() => deleteRows(id)} /> */}
        </CardContent>
      </Card>
    </div>
  );
}
