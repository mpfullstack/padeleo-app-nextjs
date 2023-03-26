import Select, { Option } from '@/modules/common/components/Form/Select';

const Duration = ({ value, onChange }: Props) => {
  const durations: Option[] = [
    {
      id: HALF_AN_HOUR,
      value: '30 min',
    },
    {
      id: ONE_HOUR,
      value: '1h',
    },
    {
      id: ONE_AND_A_HALF_HOUR,
      value: '1h30',
    },
    {
      id: TWO_HOURS,
      value: '2h',
    },
  ];

  return (
    <Select
      label="Duración"
      value={value?.toString() || ONE_AND_A_HALF_HOUR.toString()}
      options={durations}
      onChange={onChange}
    />
  );
};

interface Props {
  value: number;
  onChange: (value: string) => void;
}

export const HALF_AN_HOUR = 1800; // Seconds
export const ONE_HOUR = HALF_AN_HOUR * 2;
export const ONE_AND_A_HALF_HOUR = HALF_AN_HOUR * 3;
export const TWO_HOURS = HALF_AN_HOUR * 4;

export default Duration;
