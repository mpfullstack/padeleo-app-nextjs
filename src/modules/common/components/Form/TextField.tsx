import styled from 'styled-components';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

const TextField = (props: TextFieldProps) => {
  return (
    <TextFieldWrapper>
      <MuiTextField fullWidth variant="standard" {...props} />
    </TextFieldWrapper>
  );
};

const TextFieldWrapper = styled.div`
  width: 100%;
  margin: 1rem 0;
  label {
    font-size: 1.5rem;
  }
  input {
    font-size: 1.5rem;
  }
`;

export default TextField;
