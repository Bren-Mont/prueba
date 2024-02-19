'use client'
import { useEffect, useState } from "react";
import { Button, Card, CardContent, Divider, Pagination, Typography } from "@mui/material";
import ApiService from "@/app/Infraestructure/axios";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import ModalDelete from "@/app/components/modal/modal";
import SearchBar from "@/app/Components-Shared/search/Searcher";
import {} from '../style/style.css'
import ProjectForm from "./Components/form/ProjectForm";

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

export default function ListProject() {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm()
  const [showCard, setShowCard] = useState(false);
  const [showCardMultiple, setShowCardMultiple] = useState(false);
  const [result, setResult] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const getData = async (value = "") => {
    try {
      const { data } = await ApiService.get(
      `/users/project/searcher/?search=${value}&page=${page}`
      );
      setTotalPages(Math.ceil(data.count / pageSize));
      setResult(data?.results|| []);
      reset()
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

 const deleteRows= (id)=>{
  setDeleteModal(false)
  const rows = result.filter((row)=>row.id !== id)
  setResult(rows)
 }

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
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const columns = [
    {
      field: "user_id",
      headerName: "Cliente",
      type: "image",
      width: 200,
      renderCell: (params) => {
        const { name } = params.row.user_id|| {};
        return name;
      },
    },
    {
      field: "name",
      headerName: "Proyecto",
      width: 200,
    },
    {
      field: "image",
      headerName: "Logo/Imagen",
      width: 300,
    },
    {
      field: "city",
      headerName: "Cuidad",
      width: 100,
      renderCell: (params) => {
        const { name } = params.row.city|| {};
        return name;
      },
    },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 150,
      renderCell: (params) => {
        const onClick = (e) => {
          deleteRows(params.row.id)
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
        <div className="content-up pl-5 pr-5 pt-5">
          <Typography className="font-semibold text-xl pt-2">
            Projectos Registrados
          </Typography>
         
          <div 
          style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '16px' }}
          className="justify-center items-center">
          
          <SearchBar search={handleSearchDebounced}/>
          <Button
            className="bg-violet-950 m-2 rounded-full text-white normal-case "
            onClick={handleOpen}
          >
            <AddIcon className="mr-2" />
            Nueva Proyecto
          </Button>
          {showCard && <ProjectForm onOpen={handleOpen} onClose={handleClose} />}
          </div>
        </div>
        <Divider />
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
            getRowId={(row) => row.project_id}
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
