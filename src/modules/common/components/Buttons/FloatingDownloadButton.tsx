import styled from 'styled-components';
import Download from '@/modules/common/icons/Download';
import { FloatinButton } from './Buttons';

const FloatingDownloadButton = ({ onClick }: Props) => {
  return (
    <FloatingButtonWrapper>
      <FloatinButton onClick={onClick}>
        <Download />
      </FloatinButton>
    </FloatingButtonWrapper>
  );
};

const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
`;

interface Props {
  onClick: () => void;
}

export default FloatingDownloadButton;
