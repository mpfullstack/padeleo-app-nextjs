import styled from 'styled-components';

export const MatchItemWrapper = styled.div`
  width: 100%;
  padding: 0.8rem 1.2rem;
  margin-bottom: 2rem;
  text-transform: inherit;
  -webkit-box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ClubName = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const SideContent = styled(Content)`
  margin-left: auto;
  align-self: flex-start;
`;

export const Paragraph = styled.p`
  font-size: 1.5rem;
  text-transform: capitalize;
  margin: 0.2rem;
`;

export const Wrapper = styled.span`
  margin: 1rem 0.5rem 0 0;
  display: flex;
  align-items: flex-end;
`;

export const Text = styled.span`
  font-size: 1.4rem;
  margin-right: 0.5rem;
`;

export const Span = styled.span`
  font-size: 1.2rem;
`;
