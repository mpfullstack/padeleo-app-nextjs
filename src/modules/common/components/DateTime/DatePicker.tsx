import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { Props } from '@/modules/common/components/DateTime/types';
import 'dayjs/locale/es';

const DatePicker = ({ date, label, onChange }: Props) => {
  const [value, setValue] = useState<Dayjs | null>(date && dayjs(date));
  const handleDateChange = (value: Date | null) => {
    setValue(dayjs(value));
    onChange && onChange(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <MuiDatePicker
        label={label}
        value={value}
        onChange={handleDateChange}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
