import { useTheme } from '@mui/material';
import { Text } from './styles';
import styled from 'styled-components';

const CourtBooked = ({ booked }: { booked: boolean }) => {
  const { palette } = useTheme();
  if (booked) {
    return <CourtBookedText color={palette.success.main}>{`(Pista reservada)`}</CourtBookedText>;
  }

  return <CourtBookedText color={palette.error.main}>{`(Pista sin reservar)`}</CourtBookedText>;
};

const CourtBookedText = styled(Text)`
  font-weight: 400;
  margin: 0.3rem 0 0.4rem 0;
`;

export default CourtBooked;
