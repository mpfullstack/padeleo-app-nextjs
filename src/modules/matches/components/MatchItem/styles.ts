import styled from 'styled-components';

export const Paragraph = styled.p`
  font-size: 1.5rem;
  text-transform: capitalize;
  margin: 0.2rem;
`;

export const Text = styled.span<{ color?: string }>`
  font-size: 1.4rem;
  margin-right: 0.5rem;
  color: ${({ color }) => color || 'inherit'};
`;

export const Span = styled.span`
  font-size: 1.2rem;
`;
