import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

const TextField = (props: TextFieldProps) => {
  return <MuiTextField variant="standard" {...props} />;
};

export default TextField;
