import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const CategoryItem = ({ name, priority, 
  handleEdit, handleDelete
}) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      p={2}
      mb={2}
    >
      <Typography variant='h6'>
        {priority}
      </Typography>

      <Box
        ml={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '40%'
        }}
      >
        <Typography variant='h6' align='center'>
          {name}
        </Typography>
      </Box>

      <Box display='flex' alignItems='center'>
        <IconButton
          onClick={handleEdit}
         size='small' color='inherit'>
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={handleDelete}
         size='small' color='error'>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default CategoryItem
