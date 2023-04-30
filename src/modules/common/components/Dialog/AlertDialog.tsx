import { Button } from '@/modules/common/components/Buttons/Buttons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({ title, content, open, onClose }: Props) => {
  const handleClose = (confirm: boolean) => {
    onClose(confirm);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>{`No`}</Button>
        <Button color="error" onClick={() => handleClose(true)} autoFocus>{`Si`}</Button>
      </DialogActions>
    </Dialog>
  );
};

interface Props {
  title: string;
  content: string;
  open: boolean;
  onClose: (confirm: boolean) => void;
}

export default AlertDialog;
