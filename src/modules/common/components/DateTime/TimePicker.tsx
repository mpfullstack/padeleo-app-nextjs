import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { Props } from '@/modules/common/components/DateTime/types';
import 'dayjs/locale/es';

const TimePicker = ({ date, label, onChange }: Props) => {
  const [value, setValue] = useState<Dayjs | null>(date && dayjs(date));
  const handleTimeChange = (value: Date | null) => {
    setValue(dayjs(value));
    onChange && onChange(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <MuiTimePicker
        label={label}
        value={value}
        onChange={handleTimeChange}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
