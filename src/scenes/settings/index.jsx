import React, { useState, useRef} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Divider,
  Table,
  Snackbar,
  Alert
} from '@mui/material'

import Header from '../../components/Header'



const Settings = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const [openSnackbar, setOpenSnackbar] = useState(false)
    //selected file
    const [file, setFile] = useState(null)

    const handleClickOpen = () => {
        setOpen(true)
    }

   
  return  <Box m='20px'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Header
            title='Settings'
            subtitle='Manage the whole system here'
          />
          </Box>
            <Divider /> 
            {/* a box to change the current appLogo */}
            <Box mt={2}>
                <Typography variant='h6'>
                    App Logo
                </Typography>
                <Box display='flex' alignItems='center'
                sx= {{ mt: 2 }}
                >
                    <Box
                        component='img'
                        src='https://via.placeholder.com/150'
                        sx={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '10%',
                            objectFit: 'cover'
                        }}
                    />
                    <Box ml={2}>
                        <Button
                        onClick={handleClickOpen}
                         variant='contained'
                        sx= {{
                            backgroundColor: '#1898FF',
                        }}
                        >
                            Change Logo
                        </Button>

                        <Button variant='contained' color='error' sx={{ ml: 2 }}>
                            Remove Logo
                        </Button>
                        </Box>
                    </Box>
                    </Box>

                    

        </Box>
}

export default Settings