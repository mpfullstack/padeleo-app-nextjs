import { useState } from 'react';
import styled from 'styled-components';
import { Option } from '@/modules/common/components/Form/Select';
import ClubField, { ClubValue } from '@/modules/matches/components/MatchForm/ClubField';
import { Match } from '@/modules/matches/model';
import { Button } from '@/modules/common/components/Buttons/Buttons';
import MatchDateTime, { DateTimeValue } from '@/modules/matches/components/MatchForm/MatchDateTime';
import PlayersField, { PlayersValue } from '@/modules/matches/components/MatchForm/PlayersField';

const MatchForm = ({ field, value, options, onFinish }: Props) => {
  const [formData, setFormData] = useState<FormData>(value);
  const handleChange = (formData: FormData) => setFormData((state: FormData) => ({ ...state, ...formData }));

  return (
    <StyledForm
      noValidate
      autoComplete="off"
      onSubmit={e => {
        debugger;
        onFinish(formData);
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {field === 'clubName' && <ClubField value={formData as ClubValue} onChange={handleChange} />}

      {field === 'startTime' && <MatchDateTime value={formData as DateTimeValue} onChange={handleChange} />}

      {field === 'players' && <PlayersField value={formData as PlayersValue} onChange={handleChange} />}

      <Button type="submit" color="primary">{`Guardar`}</Button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 96%;
  margin: 1rem auto 0;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 52rem;
  min-height: 30rem;
  .submit {
    margin-top: 2rem;
  }
`;

export type FormData = Partial<Match>;

interface Props {
  field: string;
  value: FormData;
  options: Option[];
  onFinish: (data: Partial<Match>) => void;
}

export default MatchForm;
