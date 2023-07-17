import React, { useState, useRef, useEffect } from 'react'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
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
  Snackbar,
  Alert,
  Table, TableHead, TableBody, TableRow, TableCell,
  MenuItem,
  Menu,
  IconButton
} from '@mui/material'

import Header from '../../components/Header'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const Offices = () => {
    const [offices, setOffices] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const url = 'http://naptip.gov.ng/offices_api.php'

  // State to handle the form input for adding a new branch
  const [newBranchData, setNewBranchData] = useState({
    name: '',
    location: '',
    email: '',
    phone: ''
  })

  // State to control the visibility of the "Add Branch" dialog
  const [openAddBranchDialog, setOpenAddBranchDialog] = useState(false)

  // Function to handle form input changes for adding a new branch
  const handleNewBranchInputChange = event => {
    const { name, value } = event.target
    setNewBranchData({
      ...newBranchData,
      [name]: value
    })
  }

  //close "openAddBranchDialog"
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    }
  // Function to handle submitting the form to add a new branch
  const handleAddBranchSubmit = async () => {
    console.log(newBranchData)
    try {
        const requestBody = JSON.stringify({
            name: newBranchData.name,
            location: newBranchData.location,
            email: newBranchData.email,
            phone: newBranchData.phone
          })
        // Send a POST request to the API to add the new branch
        const response = await axios.post(url, requestBody)
        // If the request is successful, show a success message
        console.log("response", response)
        setMessage('Branch added successfully.')
        fetchOffices()
        setSeverity('success')
         setOpen(false)
        handleClose()
    } catch (error) {
        // If there's an error, show an error message
        console.log("error", error)
        setMessage('An error occurred. Please try again.')
        setSeverity('error')
        setOpen(true)
        //close the "Add Branch" dialog

    }
}
const fetchOffices = async () => {
    try {
        setLoading(true)
        const response = await axios.get(url)
        //order alphaberically 
        response.data.sort((a, b) => a.name.localeCompare(b.name))
        setOffices(response.data)
        setLoading(false)
    } catch (error) {
        console.log("error", error)
        setLoading(false)
        setError(error)
    }
}

//fetching data from the api
useEffect(() => {
    fetchOffices()
}, [])

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Branch' subtitle='All NAPTIP branch across the globe.' />
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#1898FF',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1898FF',
              color: '#fff'
            }
          }}
          onClick={() => setOpenAddBranchDialog(true)} // Open the "Add Branch" dialog when the button is clicked
        >
          Add Branch
        </Button>
      </Box>
      <Divider />
      {/* "Add Branch" Dialog */}
      <Dialog
        open={openAddBranchDialog}
        onClose={() => setOpenAddBranchDialog(false)}
      >
        <DialogTitle>Add Branch</DialogTitle>
        <DialogContent>
          {/* Form fields to input the new branch data */}
          <TextField
            fullWidth
            label='Branch Name'
            name='name'
            value={newBranchData.name}
            onChange={handleNewBranchInputChange}
          />
          <TextField
            fullWidth
            label='Location'
            name='location'
            value={newBranchData.location}
            onChange={handleNewBranchInputChange}
          />
          <TextField
            fullWidth
            label='Email'
            name='email'
            value={newBranchData.email}
            onChange={handleNewBranchInputChange}
          />
          <TextField
            fullWidth
            label='Phone'
            name='phone'
            value={newBranchData.phone}
            onChange={handleNewBranchInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddBranchDialog(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAddBranchSubmit} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Box mt='20px'>
      <Table sx={{ minWidth: 650 }}>
      <TableHead sx={{ 
        fontWeight: 'bold',
        fontSize: '18px',
        
       }}>
        <TableRow>
        <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Branch Name</TableCell>
          <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Location</TableCell>
          <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Email</TableCell>
          <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Phone</TableCell>
          <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Action</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {offices.map((office, index) => (
          <TableRow key={index}>
            <TableCell>{office.name}</TableCell>
            <TableCell>{office.location}</TableCell>
            <TableCell>{office.email}</TableCell>
            <TableCell>{office.phone}</TableCell>
            <TableCell>
              <PopupState variant="popover" popupId={`demo-popup-menu-${index}`}>
                {(popupState) => (
                  <React.Fragment>
                    <IconButton {...bindTrigger(popupState)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>Edit</MenuItem>
                      <MenuItem onClick={popupState.close}>Delete</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      </Box>
    </Box>
  )
}

export default Offices
