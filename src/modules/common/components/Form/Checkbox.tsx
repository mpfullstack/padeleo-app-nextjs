import { ChangeEvent } from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Checkbox = ({ label, name, checked, onChange }: Props) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          name={name}
          checked={checked}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
        />
      }
      label={label}
    />
  );
};

interface Props {
  label: string;
  name: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default Checkbox;
