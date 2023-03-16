import Grid from '@/modules/common/components/Grid';
import { ReactElement } from 'react';

const Col = ({ children, xs = 12, ...rest }: Props) => {
  return (
    <Grid item xs={xs} {...rest}>
      {children}
    </Grid>
  );
};

const Row = ({ children, ...rest }: Props) => {
  return (
    <Grid container spacing={3} {...rest}>
      {children}
    </Grid>
  );
};

interface Props {
  children: ReactElement;
  xs?: number;
}

export { Row, Col };
