import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from '@/modules/common/components/DateTime/DatePicker';
import TimePicker from '@/modules/common/components/DateTime/TimePicker';

const TimePickersWrapper = styled.div`
  display: flex;
  & > div:first-child {
    margin-right: 10px;
  }
  & > div:last-child {
    margin-left: 10px;
  }
`;

const MatchDateTime = ({ start, end, onChange }: Props) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(start || null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(end || null);

  const handleDateChange = (field: Field, date: Date | null) => {
    const dateAndTime: DateTime = {
      start: selectedStartDate,
      end: selectedEndDate,
    };
    const selectedDate = date ? new Date(date) : new Date();

    if (field === 'startTime' || field === 'date') {
      setSelectedStartDate(selectedDate);
      dateAndTime.start = selectedDate;
    }

    if (field === 'endTime') {
      if (dateAndTime.start) {
        selectedDate.setDate(dateAndTime.start.getDate());
        selectedDate.setMonth(dateAndTime.start.getMonth());
        selectedDate.setFullYear(dateAndTime.start.getFullYear());
      }
      setSelectedEndDate(selectedDate);
      dateAndTime.end = selectedDate;
    }

    onChange(dateAndTime);
  };

  return (
    <>
      <DatePicker label="Match date" date={selectedStartDate} onChange={value => handleDateChange('date', value)} />
      <TimePickersWrapper>
        <TimePicker
          label="Start time"
          date={selectedStartDate}
          onChange={value => handleDateChange('startTime', value)}
        />
        <TimePicker label="End time" date={selectedEndDate} onChange={value => handleDateChange('endTime', value)} />
      </TimePickersWrapper>
    </>
  );
};

type Field = 'date' | 'startTime' | 'endTime';

export interface DateTime {
  start?: Date | null;
  end?: Date | null;
}

interface Props extends DateTime {
  onChange: (dateTime: DateTime) => void;
}

export default MatchDateTime;
