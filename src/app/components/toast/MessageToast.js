import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function MessageToast() {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} className="pt-4" alignItems="center" justify="center">
            <Grid item xs={12} md={12} align="center">
                <Stack sx={{ width: '50%' }} spacing={2} >
                    <Alert variant="filled" severity="error" className='justify-center'>
                        Ocurrio un error, intenta de nuevo
                    </Alert>
                </Stack>
            </Grid>
        </Grid>
    );
}