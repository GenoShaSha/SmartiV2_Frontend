import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function BackdropLoader(props:any) {


  return (
    <Box sx={{width:"100vw",height:"100vh",position:'absolute',top:"0"}}>
      <Backdrop
        sx={{ color: '#214892', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}