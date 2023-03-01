import { ReactElement } from 'react';
import Typography from '@mui/material/Typography';

const Paragraph = ({ children }: { children: ReactElement | string }): JSX.Element => {
  return (
    <Typography fontSize={'1.8rem'} gutterBottom>
      {children}
    </Typography>
  );
};

export default Paragraph;
