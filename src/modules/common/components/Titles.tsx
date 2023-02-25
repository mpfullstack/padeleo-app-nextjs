import { ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';

const DefaultTitle = ({ variant, children }: { variant: Variant; children: ReactElement | string }): JSX.Element => {
  return (
    <Typography variant={variant} gutterBottom>
      {children}
    </Typography>
  );
};

export const Title = ({ children, ...props }: { children: ReactElement | string }): JSX.Element => {
  return <DefaultTitle variant="h1">{children}</DefaultTitle>;
};

export const SubTitle = ({ children }: { children: ReactElement | string }): JSX.Element => {
  return <DefaultTitle variant="h2">{children}</DefaultTitle>;
};
