import MuiButton, { ButtonProps } from '@mui/material/Button';
import MuiLoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export const Button = (props: ButtonProps) => {
  return <MuiButton variant="contained" {...props} />;
};

export const LoadingButton = (props: LoadingButtonProps) => {
  return <MuiLoadingButton variant="contained" {...props} />;
};
