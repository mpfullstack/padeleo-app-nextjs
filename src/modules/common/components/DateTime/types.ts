export interface Props {
  date: Date | null;
  label: string;
  onChange: (date: Date | null) => void;
};