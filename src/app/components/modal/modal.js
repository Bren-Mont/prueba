import { Box, Button, InputAdornment, Modal, Typography } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import './style.css';

function ModalDelete({ deleteRows, onOpen, onClose }) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 10,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal
      className="custom-modal "
      open={onOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="text-custom-modal">
          <InputAdornment className="icon">
            <ErrorOutlineOutlinedIcon color="error" sx={{ fontSize: 60 }} />
          </InputAdornment>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ¿Estás seguro de eliminar este módulo? al momento de eliminarlo, los datos asociados al
            módulo serán borrados definitivamente
          </Typography>
        </div>
        <div className="buttons-custom-modal">
          <Button variant="outlined" color="primary" onClick={onClose}>
            Regresar
          </Button>
          <Button variant="outlined" color="error" onClick={deleteRows}>
            Eliminar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalDelete;
