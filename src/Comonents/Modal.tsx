import { FunctionComponent } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CardData } from '../Types/CardData';

interface CustomizedDialogProps {
  open: boolean;
  handleClose: () => void;
  cardData: CardData | null;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    backgroundColor: 'white',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CustomizedDialogs: FunctionComponent<CustomizedDialogProps> = ({ open, handleClose, cardData }) => {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {cardData?.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <TextField size="small" variant="outlined" placeholder="Modal" label="Modal" />
              <TextField size="small" variant="outlined" placeholder="Location" label="Location" />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <TextField size="small" variant="outlined" placeholder="Color" label="Color"/>
              <TextField size="small" variant="outlined" placeholder="No Of Owners" label="No Of Owners" />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <TextField size="small" variant="outlined" placeholder="Body Type" />
              <TextField size="small" variant="outlined" placeholder="Last Name" />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default CustomizedDialogs;
