import MuiAdd from '@mui/icons-material/Add';
import styled from 'styled-components';

const Add = () => (
  <AddWrapper>
    <MuiAdd />
  </AddWrapper>
);

const AddWrapper = styled.span`
  .MuiSvgIcon-root {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
  }
`;

export default Add;
