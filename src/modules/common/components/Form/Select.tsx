import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectProps, SelectChangeEvent } from '@mui/material/Select';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Select = ({ options, onChange, value, className, label }: Props) => {
  const handleChange = (event: SelectChangeEvent) => onChange && onChange(event.target.value as string);

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={label}>{label}</InputLabel>}
      <MuiSelect label={label || ''} labelId={label || ''} value={value} onChange={handleChange} className={className}>
        {options.map((option: Option) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              <ItemText>{option.value}</ItemText>
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};

const ItemText = styled.p`
  font-size: 1.5rem;
  margin: 0;
`;

export interface Option {
  id: string | number;
  value: string | undefined;
}

interface Props extends Omit<SelectProps, 'onChange'> {
  options: Option[];
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default Select;
