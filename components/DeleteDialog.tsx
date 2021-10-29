import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => any;
  onDelete: () => any;
}

export default function AlertDialog({ open, setOpen, onDelete }: DeleteDialogProps) {
  const onClose = () => {
    setOpen(false);
  };

  const onYes = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Do you really want to delete this note?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This note will be deleted forever and you can't recover it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onYes}>Yes</Button>
        <Button onClick={onClose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
