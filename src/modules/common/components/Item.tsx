import styled from 'styled-components';
import { ReactElement } from 'react';

const Item = ({ children, actions }: Props) => {
  return (
    <ItemWrapper>
      <Content>{children}</Content>
      {actions}
    </ItemWrapper>
  );
};

export const ItemWrapper = styled.div`
  width: 100%;
  padding: 1.2rem 1.2rem;
  margin-bottom: 2rem;
  text-transform: inherit;
  -webkit-box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Content = styled.div`
  display: flex;
`;

interface Props {
  children: ReactElement;
  actions?: ReactElement;
}

export default Item;
