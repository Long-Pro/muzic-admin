import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Modal, Button, TextField, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

interface IProp {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  title?: string
  children: JSX.Element | JSX.Element[]
}

function CustomizeModal({ open, setOpen, children, title }: IProp) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="modal-wrapper">
        <div className="title-wrapper">
          <h3 className="title">{title}</h3>
          <Close onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} sx={{ marginLeft: '30px' }} />
        </div>
        <div className="content">{children}</div>
        {/* <div className="delete-button-group">
          <Button size="small" variant="contained" color="warning" onClick={() => setOpen(false)}>
            Thoát
          </Button>
        </div> */}
      </div>
    </Modal>
  )
}

export default CustomizeModal
