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
  margin: 2rem 0;
`;

export default TextField;
