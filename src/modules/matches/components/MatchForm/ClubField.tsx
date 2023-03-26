import styled from 'styled-components';
import useSWR from 'swr';
import api, { getClubs } from '@/modules/common/services/api';
import { Row, Col } from '@/modules/common/components/Layout';
import Select, { Option } from '@/modules/common/components/Form/Select';
import Checkbox from '@/modules/common/components/Form/Checkbox';
import { Club } from '@/modules/clubs/model';

const ClubField = ({ value: fieldValue, onChange }: Props) => {
  const { data } = useSWR(api.clubsUrl, getClubs);

  if (!data?.result) {
    return null;
  }

  const options = data.result.map((club: Club) => ({
    id: club.id as string,
    value: club.name,
  }));

  const handleChange = (value: ClubValue) => {
    const club = options.find((option: Option) => option.id === value.clubId);
    onChange({
      clubId: club?.id as string,
      clubName: club?.value as string,
      courtBooked: value.courtBooked,
    });
  };

  return (
    <>
      <StyledRow>
        <Col>
          <Select
            label="Club"
            value={fieldValue.clubId}
            options={options}
            onChange={clubId => handleChange({ ...fieldValue, clubId })}
          />
        </Col>
      </StyledRow>
      <StyledRow>
        <Col>
          <Checkbox
            label="Pista reservada"
            name="courtBooked"
            onChange={value => handleChange({ ...fieldValue, courtBooked: value })}
            checked={fieldValue.courtBooked}
          />
        </Col>
      </StyledRow>
    </>
  );
};

const StyledRow = styled(Row)`
  margin: 1rem;
  &.MuiGrid-container:first-child {
    margin-bottom: 0px;
  }
`;

export interface ClubValue {
  clubId: string;
  clubName: string;
  courtBooked: boolean;
}

interface Props {
  value: ClubValue;
  onChange: (value: ClubValue) => void;
}

export default ClubField;
