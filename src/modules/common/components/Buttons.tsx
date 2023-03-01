import MuiButton, { ButtonProps } from '@mui/material/Button';
import MuiIconButton from '@mui/material/IconButton';
import MuiLoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export const Button = (props: ButtonProps) => {
  return <MuiButton variant="contained" {...props} />;
};

export const LoadingButton = (props: LoadingButtonProps) => {
  return <MuiLoadingButton variant="contained" fullWidth {...props} />;
};

export const IconButton = ({ children, ...props }: ButtonProps) => {
  return <MuiIconButton {...props}>{children}</MuiIconButton>;
};
