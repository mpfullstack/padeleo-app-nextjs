import { ReactElement } from 'react';
import MuiBadge from '@mui/material/Badge';

const Badge = ({ value, icon }: Props) => {
  return (
    <MuiBadge color="secondary" badgeContent={value}>
      {icon}
    </MuiBadge>
  );
};

interface Props {
  value: ReactElement;
  icon: ReactElement;
}

export default Badge;
