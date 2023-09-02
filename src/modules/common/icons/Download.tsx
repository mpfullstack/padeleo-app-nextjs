import MuiDownload from '@mui/icons-material/Download';
import styled from 'styled-components';

const Download = () => (
  <AddWrapper>
    <MuiDownload />
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

export default Download;
