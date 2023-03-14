import { useState, SyntheticEvent } from 'react';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';

const Tabs = ({ options = [], selected, handleTabChange }: Props) => {
  const [value, setValue] = useState(selected);

  const onChangeTab = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    handleTabChange(newValue);
  };

  const renderTabs = () => {
    return options.map(option => {
      return <MuiTab key={option.key} label={option.label} value={option.key} />;
    });
  };

  return (
    <MuiTabs value={value} onChange={onChangeTab} indicatorColor="secondary" textColor="secondary" centered>
      {renderTabs()}
    </MuiTabs>
  );
};

interface Props {
  options: Option[];
  selected: string;
  handleTabChange: (option: string) => void;
}

interface Option {
  key: string;
  label: string;
}

export default Tabs;
