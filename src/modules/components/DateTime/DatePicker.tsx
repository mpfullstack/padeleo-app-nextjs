import * as React from "react";
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

const DatePicker = ({ date, label, onChange }: Props) => {
  const [value, setValue] = React.useState<Dayjs>(dayjs(date));
  const handleDateChange = (value: Date | null) => {
    setValue(dayjs(value));
    if (typeof onChange === "function") {
      onChange(value);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        value={value}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

interface Props {
  date: Date;
  label: string;
  onChange: (date: Date | null) => void;
}

export default DatePicker;