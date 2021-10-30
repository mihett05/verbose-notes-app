import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => any;
  onDelete: () => any;
}

export default function AlertDialog({ open, setOpen, onDelete }: DeleteDialogProps) {
  const { t } = useTranslation();
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
      <DialogTitle id="alert-dialog-title">{t('deleteDialogHeader')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{t('deleteDialogText')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onYes}>{t('deleteDialogYes')}</Button>
        <Button onClick={onClose} autoFocus>
          {t('deleteDialogNo')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
