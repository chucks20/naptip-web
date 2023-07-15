import React, { useState } from 'react'
import axios from 'axios'
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
  Divider
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { tokens } from '../../themes'
import AddIcon from '@mui/icons-material/Add'
import Header from '../../components/Header'
import CategoryItem from '../../components/CetegoryItem'

const Categories = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [open, setOpen] = useState(false)
  const url = 'http://naptip.gov.ng/ireports_actions.php'
  const [categoryData, setCategoryData] = useState({
    name: '',
    priority: ''
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = e => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddCategory = async () => {
    const requestBody = JSON.stringify({
      name: categoryData.name,
      priority: categoryData.priority
    })

    try {
      const response = await axios.put(url, requestBody, {
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.status === 200) {
        // Connection successful, handle the response
        console.log('Connection successful')
        console.log(response.data) // Output the response data
      } else {
        // Connection failed, handle the error
        console.log(`Connection failed with status: ${response.status}`)
      }
    } catch (error) {
      // Exception occurred during the connection
      console.log('Error:', error)
    }
  }

  //fetch categories
  const fetchCategories = () => {
    fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        handleClose()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const renderMainView = () => {
    return (
      <Box m='20px'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Header
            title='Categories'
            subtitle='Add, edit, delete and view categories'
          />
          {/* Add Category */}
          <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: '#1898FF',
               color: '#fff',  
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
            //Icon
            startIcon={<AddIcon />}
          >
            Add Category
          </Button>
        </Box>
        {/* List of Categories */}
        <Box display='flex' flexDirection='column' mt={2}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='h6'>Priority</Typography>
            <Typography variant='h6'>Name</Typography>
            <Typography variant='h6'>Actions</Typography>
          </Box>
          <Divider />
          <CategoryItem name='Sexual Abuse' priority='1' />
          <CategoryItem name='Child Labour' priority='2' />
          <CategoryItem name='Child Trafficking' priority='3' />
        </Box>
      </Box>
    )
  }

  const renderDialogView = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name and priority of the category.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            name='name'
            label='Category Name'
            type='text'
            fullWidth
            value={categoryData.name}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='priority'
            label='Priority'
            type='number'
            fullWidth
            value={categoryData.priority}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAddCategory}
            variant='contained'
            sx={{
              backgroundColor: '#1898FF'
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      {renderMainView()}
      {renderDialogView()}
    </>
  )
}

export default Categories
