import React, { useState, useRef} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
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
  Alert,
  MenuItem,
  Menu,
 IconButton,
} from '@mui/material'

import Header from '../../components/Header'


const Reports = () => {
    //isFetching is used to show the loading spinner
    const [isFetching, setIsFetching] = useState(false)
    return <Box m='20px'>
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Header
        title='Reports'
        subtitle='View all incidences reported by users'
      />
       <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" 
            style={{backgroundColor: '#1898FF', color: '#fff'}} 
          {...bindTrigger(popupState)}>
            Export
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>PDF</MenuItem>
            <MenuItem onClick={popupState.close}>CSV</MenuItem>
            <MenuItem onClick={popupState.close}>Excel</MenuItem>
            <MenuItem onClick={popupState.close}>Word</MenuItem>
           
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
      </Box>
        <Divider />
       
        
        </Box>
}

export default Reports