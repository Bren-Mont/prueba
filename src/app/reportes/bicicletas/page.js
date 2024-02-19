"use client";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Pagination,
  Typography,
} from "@mui/material";
import ApiService from "@/app/Infraestructure/axios";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import _ from "lodash";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { useForm } from "react-hook-form";
import {} from "../style/style.css";
import SelectIndicator from "../components/SelectIndicator";
import { DatePicker } from "antd";
import * as XLSX from 'xlsx';
import { CalendarFilled  } from '@ant-design/icons';

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.columnHeadersInner}`]: {
    backgroundColor: "#333366",
    color: "#ffffff",
    fontWeight: "bold",
  },
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

export default function ReportBike() {
  const CustomSuffixIcon = () => {
    return <CalendarFilled style={{ color: '#666666' }} />; 
  };
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [options, setOptions] = useState([]);
  const pageSize = 5;

  const getData = async (startDate, endDate, parking) => {
    try {
      let endpoint = `/biciparkingLite/ReportBici/?project_id=1`;
      if (startDate && endDate) {
        endpoint += `&event_date_in_from=${startDate}&event_date_in_to=${endDate}&parking_id=${parking}`;
      }
      const { data } = await ApiService.get(endpoint);
      const processedData = data.map(item => {
        const formattedEventDateIn = format(new Date(item.event_date_in), 'yyyy-MM-dd hh:mm:ss');
        const formattedEventDateOut = format(new Date(item.event_date_out), 'yyyy-MM-dd hh:mm:ss');
        return {
            ...item,
            Usuario: `${item.name} ${item.last_name}`,
            event_date_in: formattedEventDateIn,
            event_date_out: formattedEventDateOut,
        };
      });
      setResult(processedData || []);
      setOptions(data);
      reset();
    } catch (error) {
      console.error("Error al obtener la unidad:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  
  const handleSelectChange = (selectedParkingId) => {
    getData(startDate, endDate, selectedParkingId);
  };

  const handleDownloadExcel = () => {
    const dataToExport = result.map(row => ({
      Estación: row.station,
      Usuario: row.Usuario,
      'Serial Bicicleta': row.bike_serial,
      Tipo: row.bike_type,
      Marca: row.brand,
      Color: row.color,
      Ingreso: row.event_date_in,
      Salida: row.event_date_out,
      Detalle: row.detail,
    }));
  
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    XLSX.writeFile(wb, 'registro_bicicletas.xlsx');
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      getData(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    } else {
      getData(); 
    }
  };
  
  const columns = [
   
    {
      field: "parking_name",
      headerName: "Estación",
      width: 150,
    },
    {
      field: "Usuario",
      headerName: "Usuario",
      width: 250,
      
    },
    {
      field: "bike_serial",
      headerName: "Serial Bicicleta",
      width: 150,
      
    },
    {
      field: "bike_type",
      headerName: "Tipo",
      width: 100,
      
    },
    {
      field: "brand",
      headerName: "Marca",
      width: 100,
      
    },
    {
      field: "color",
      headerName: "Color",
      width: 100,
      
    },
    {
        field: "event_date_in",
        headerName: "Ingreso",
        type: "image",
        width: 200,
      },
      
    {
        field: "event_date_out",
        headerName: "Salida",
        type: "image",
        width: 200,
      }

  ];
  return (
    <div className="flex justify-center pt-500">
      <Card
        sx={{ width: "90%", maxWidth: 1000, minHeight: "410px" }}
        className="card-units"
      >
        <div className="flex">
          <SelectIndicator options={options} onSelectChange={handleSelectChange}  />
          <DatePicker.RangePicker
            className="h-12 bg-white ml-8 mr-40 mt-2 mb-2"
            onChange={handleDateRangeChange}
            placeholder={['Fecha de inicio', 'Fecha de fin']}
            suffixIcon={<CustomSuffixIcon />}
          />
          <Button
            className="h-12 m-2 ml-16 rounded-full text-white  normal-case hover:bg-sky-400 "
            onClick={handleDownloadExcel}
            style={{backgroundColor:'#333366'}}
          >
            <SimCardDownloadIcon/>
            Descargar
          </Button>
        </div>
        <Divider />
        <CardContent sx={{ maxHeight: 600 }}>
          <Typography className="font-semibold text-sky-400 text-2xl text-center pb-2">
            Últimos registros
          </Typography>

          <StripedDataGrid
            rows={result}
            columns={columns}
            // pagination
            // pageSize={pageSize}
            // rowCount={totalPages}
            // paginationMode="server"
            autoHeight
            // onPageChange={(newPage) => setPage(newPage)}
            getRowId={(row) => row.event_date_in}
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
