import Select, { Option } from '@/modules/common/components/Form/Select';

const Duration = ({ value, onChange }: Props) => {
  const durations: Option[] = [
    {
      id: 1800,
      value: '30 min',
    },
    {
      id: 3600,
      value: '1h',
    },
    {
      id: 5400,
      value: '1h30',
    },
    {
      id: 7200,
      value: '2h',
    },
  ];

  return <Select value={value?.toString()} options={durations} onChange={onChange} />;
};

interface Props {
  value: number;
  onChange: (value: string) => void;
}

export default Duration;
