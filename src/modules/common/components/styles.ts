import styled from 'styled-components';

export const Text = styled.p<{ color?: string }>`
  font-size: 1.5rem;
  margin: 0.5rem 0.5rem 0.5rem 0;
  color: ${({ color }) => color || 'inherit'};
  text-transform: capitalize;
`;
