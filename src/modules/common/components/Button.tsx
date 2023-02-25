import MuiButton, { ButtonProps } from '@mui/material/Button';

const Button = (props: ButtonProps) => {
  return <MuiButton variant="contained" {...props} />;
};

export default Button;
