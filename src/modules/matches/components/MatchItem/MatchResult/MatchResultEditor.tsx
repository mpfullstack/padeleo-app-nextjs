import Select, { Option } from '@/modules/common/components/Form/Select';
import { Result, Side } from '@/modules/results/model';
import styled from 'styled-components';
import Grid from '@/modules/common/components/Grid';

const MatchResultEditor = ({ results, side, onChange }: Props) => {
  const setResults = Array.from({ length: 3 }, (_, i: number) => results[i] || {});
  return (
    <MatchResultEditorWrapper>
      {setResults.map((result: Result, i: number) => (
        <Grid key={`result-${i}`} item xs={4}>
          <Select
            value={result[side]?.toString()}
            options={resultOptions}
            onChange={value => {
              onChange(value, i);
            }}
          />
        </Grid>
      ))}
    </MatchResultEditorWrapper>
  );
};

const resultOptions: Option[] = Array.from({ length: 10 }, (_, i: number) => ({ id: i, value: i.toString() }));

const MatchResultEditorWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

interface Props {
  results: Result[];
  side: Side;
  onChange: (score: string, set: number) => void;
}

export default MatchResultEditor;
