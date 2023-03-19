import MuiEdit from '@mui/icons-material/Edit';
import styled from 'styled-components';

const Edit = () => (
  <AddWrapper>
    <MuiEdit />
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

export default Edit;
