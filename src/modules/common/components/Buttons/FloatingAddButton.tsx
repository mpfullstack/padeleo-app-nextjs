import styled from 'styled-components';
import Add from '@/modules/common/icons/Add';
import { FloatinButton } from './Buttons';

const FloatingAddButton = ({ onClick }: Props) => {
  return (
    <FloatingButtonWrapper>
      <FloatinButton onClick={onClick}>
        <Add />
      </FloatinButton>
    </FloatingButtonWrapper>
  );
};

const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;

interface Props {
  onClick: () => void;
}

export default FloatingAddButton;
