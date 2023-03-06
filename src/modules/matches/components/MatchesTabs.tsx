import Tabs from '@/modules/common/components/Tabs/Tabs';
import styled from 'styled-components';

const MatchesTabs = ({ selected, handleTabChange }: Props) => {
  const options: Option[] = [
    {
      key: 'coming',
      label: 'Próximos',
    },
    {
      key: 'past',
      label: 'Pasados',
    },
    // {
    //   key: 'all',
    //   label: 'Todos',
    // },
  ];

  return (
    <TabsWrapper>
      <Tabs options={options} selected={selected} handleTabChange={handleTabChange} />
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  margin-bottom: 1rem;
`;

interface Props {
  selected: Key;
  handleTabChange: (key: string) => void;
}

interface Option {
  key: Key;
  label: string;
}

const keys = ['coming', 'past', 'all'] as const;
export type Key = (typeof keys)[number];

export default MatchesTabs;
