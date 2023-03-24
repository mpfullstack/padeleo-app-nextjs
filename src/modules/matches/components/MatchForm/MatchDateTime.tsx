import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from '@/modules/common/components/DateTime/DatePicker';
import TimePicker from '@/modules/common/components/DateTime/TimePicker';
import Duration from '@/modules/matches/components/MatchForm/Duration';

const MatchDateTime = ({ value, onChange }: Props) => {
  const { startTime, duration } = value;
  const [selectedStartTime, setSelectedStartTime] = useState<string>(startTime);
  const [selectedDuration, setDuration] = useState<number>(duration);

  const handleStartDateChange = (date: Date) => {
    setSelectedStartTime(date.toJSON());

    onChange({
      startTime: date.toJSON(),
      duration: selectedDuration,
    });
  };

  const handleStartTimeChange = (date: Date) => {
    const currentSelectedDate = new Date(selectedStartTime);
    currentSelectedDate.setHours(new Date(date)?.getHours());
    currentSelectedDate.setMinutes(new Date(date)?.getMinutes());
    setSelectedStartTime(currentSelectedDate.toJSON());

    onChange({
      startTime: currentSelectedDate.toJSON(),
      duration: selectedDuration,
    });
  };

  const handleDurationChange = (duration: string) => {
    setDuration(Number(duration));
    onChange({
      startTime: selectedStartTime,
      duration: Number(duration),
    });
  };

  return (
    <>
      <DatePickersWrapper>
        <DatePicker
          label="Fecha del partido"
          date={new Date(selectedStartTime)}
          onChange={value => handleStartDateChange(value as Date)}
        />
      </DatePickersWrapper>
      <TimePickersWrapper>
        <TimePicker
          label="Hora inicio"
          date={new Date(selectedStartTime)}
          onChange={value => handleStartTimeChange(value as Date)}
        />
        {<Duration value={duration} onChange={handleDurationChange} />}
      </TimePickersWrapper>
    </>
  );
};

const DatePickersWrapper = styled.div`
  margin: 1rem 0;
`;

const TimePickersWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  & > div:first-child {
    margin-right: 1rem;
  }
  & > div:last-child {
    margin-left: 1rem;
  }
`;

export interface DateTimeValue {
  startTime: string;
  duration: number;
}

interface Props {
  value: DateTimeValue;
  onChange: (value: DateTimeValue) => void;
}

export default MatchDateTime;
