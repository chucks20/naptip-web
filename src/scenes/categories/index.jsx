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
  Divider,
  Table,
  Snackbar,
  Alert
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { tokens } from '../../themes'
import AddIcon from '@mui/icons-material/Add'
import Header from '../../components/Header'
import CategoryItem from '../../components/CetegoryItem'
import { useEffect } from 'react'

const Categories = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [open, setOpen] = useState(false)
  //show snack bar
  const [openSnackBar, setOpenSnackBar] = useState(false)
  //snack bar message, and type
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [snackBarType, setSnackBarType] = useState('success')
  //show delete alert
  const [isDeleteOpen, setDelete] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const url = 'http://naptip.gov.ng/ireports_actions.php'
  const [categoryData, setCategoryData] = useState({
    name: '',
    priority: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleOpen = () => {
    setOpen(true)
    setEditMode(false)
    setCategoryData({
      name: '',
      priority: ''
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  //handle snack bar
  const handleSnackBar = (message, type) => {
    setSnackBarMessage(message)
    setSnackBarType(type)
    setOpenSnackBar(true)
  }
  //handle close snack bar
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
    setSnackBarMessage('')
    setSnackBarType('success')
  }
  const handleEdit = (name, priority) => {
    setOpen(true)
    setEditMode(true)
    setCategoryData({
      ...categoryData,
      priority: priority,
      name: name
    })
  }

  const handleDelete = (name, priority) => {
    //delete alert
    setCategoryData({
      ...categoryData,
      priority: priority,
      name: name
    })
    setDelete(true)
  }
  const deleteCategory = async () => {
    const requestBody = JSON.stringify({
      priority: categoryData.priority
    })
    console.log(requestBody)
    // "DELETE" request to delete category
    try {
      const response = await axios.delete(url, requestBody, {
        headers: { 'Content-Type': 'application/json' }
      })
  
      if (response.status === 200) {
        console.log('Category deleted successfully')
        fetchCategories()
        setDelete(false)
      } else {
        console.log(`Failed to delete category with status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error:', error)
    }
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
    //if current list contains a category priority number with new show error and return 
    if (categories.some(category => category.priority === requestBody.priority)) {
      handleSnackBar('Category priority already exists', 'error')
      return
    }
    try {
      const response = await axios.post(url, requestBody, {
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.status === 200) {
        console.log('Category added successfully')
        fetchCategories()
        handleClose()
        handleSnackBar('Category added successfully', 'success')
      } else {
        console.log(`Failed to add category with status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEditCategory = async () => {
    const requestBody = JSON.stringify({
      name: categoryData.name,
      priority: categoryData.priority
    })
    //"POST" request to update category
    try {
      const response = await axios.post(url, requestBody, {
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.status === 200) {
        console.log('Category updated successfully')
        fetchCategories()
        handleClose()
        handleSnackBar('Category updated successfully', 'success')
      } else {
        console.log(`Failed to update category with status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchCategories = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result)
        const sortedCategories = result.sort((a, b) => a.priority - b.priority)
        setCategories(sortedCategories)
        handleClose()
      })
      .catch(error => {
        console.error('Error Occurred:', error)
      })
  }

  const [categories, setCategories] = useState([])

  const renderMainView = () => {
    return (
      <Box m='20px'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Header
            title='Categories'
            subtitle='Add, edit, delete and view categories'
          />
          <Button
            onClick={handleOpen}
            sx={{
              backgroundColor: '#1898FF',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
            startIcon={<AddIcon />}
          >
            Add Category
          </Button>
        </Box>
        <Box display='flex' flexDirection='column' mt={2}>
          <Table>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              p={2}
              sx={{
                backgroundColor: colors.primary[400],
                color: '#fff',
                borderRadius: '5px'
              }}
            >
              <Typography
                variant='subtitle1'
                sx={{
                  color: '#000',
                  fontWeight: 'bold'
                }}
              >
                Priority
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{
                  color: '#000',
                  fontWeight: 'bold'
                }}
              >
                Category Name
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{
                  color: '#000',
                  fontWeight: 'bold'
                }}
              >
                Actions
              </Typography>
            </Box>
            <Divider />

            {categories.map(category => (
              <CategoryItem
                name={category.name}
                priority={category.priority}
                handleEdit={() => handleEdit(category.name, category.priority)}
                handleDelete={() =>
                  handleDelete(category.name, category.priority)
                }
              />
            ))}
          </Table>
        </Box>
      </Box>
    )
  }

  const renderDialogView = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Category' : 'Add Category'}</DialogTitle>
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
          {editMode ? (
            <Button
              onClick={handleEditCategory}
              variant='contained'
              sx={{
                backgroundColor: '#1898FF'
              }}
            >
              Update
            </Button>
          ) : (
            <Button
              onClick={!editMode ? handleAddCategory : handleEditCategory}
              variant='contained'
              sx={{
                backgroundColor: '#1898FF'
              }}
            >
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    )
  }

  const renderDeleteAlert = () => {
    return (
      <Dialog open={isDeleteOpen} onClose={() => setDelete(false)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDelete(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setDelete(false)
              deleteCategory()
            }}
            variant='contained'
            sx={{
              backgroundColor: '#1898FF'
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const renderSnackBar = () => {
    return (
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity={snackBarType}
        sx={{
          backgroundColor: snackBarType === 'success' ? '#4caf50' : '#f44336',
          //text  color
          color: "#fff",
          alignContent: 'center'

        }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    )
  }
  return (
    <>
      {renderMainView()}
      {renderDialogView()}
      {renderDeleteAlert()}
      {renderSnackBar()}
    </>
  )
}

export default Categories
