import styled from 'styled-components';
import { Option } from '@/modules/common/components/Form/Select';
import ClubField, { ClubValue } from '@/modules/matches/components/MatchForm/ClubField';
import { Match } from '@/modules/matches/model';
import { Button } from '@/modules/common/components/Buttons/Buttons';
import { useState } from 'react';

const MatchForm = ({ field, value, options, onFinish }: Props) => {
  const [formData, setFormData] = useState<FormData>(value);
  const handleChange = (formData: FormData) => setFormData((state: FormData) => ({ ...state, ...formData }));

  return (
    <StyledForm
      noValidate
      autoComplete="off"
      onSubmit={e => {
        onFinish(formData);
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {field === 'clubName' && <ClubField value={formData as ClubValue} options={options} onChange={handleChange} />}

      <Button type="submit" color="primary">{`Guardar`}</Button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 90%;
  margin: 1rem auto 0;
  display: flex;
  flex-direction: column;
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
