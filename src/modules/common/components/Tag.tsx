import { useTheme } from '@mui/material';
import { ReactElement } from 'react';
import styled from 'styled-components';

const Tag = ({ icon, label, color }: Props) => {
  const theme = useTheme();
  const tagColor = color || theme.palette.primary.main;
  return (
    <StyledTag color={tagColor}>
      {icon}
      <Span color={tagColor}>{label}</Span>
    </StyledTag>
  );
};

const StyledTag = styled.div<StyledProps>`
  display: flex;
  border: ${({ color }) => `1px solid ${color}`};
  border-radius: 4px;
  padding: 0.2rem 0.4rem;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
`;

const Span = styled.span<StyledProps>`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ color }) => color};
`;

interface StyledProps {
  color?: string;
}

interface Props extends StyledProps {
  icon: ReactElement;
  label: string;
}

export default Tag;
