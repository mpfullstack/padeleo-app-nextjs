import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectProps, SelectChangeEvent } from '@mui/material/Select';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';

const Select = ({ options, onChange, value, className }: Props) => {
  const handleChange = (event: SelectChangeEvent) => onChange && onChange(event.target.value as string);

  return (
    <FormControl fullWidth>
      <MuiSelect value={value} onChange={handleChange} className={className}>
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
  value?: string;
  onChange?: (value: string) => void;
}

export default Select;
