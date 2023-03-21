import styled from 'styled-components';
import { Row, Col } from '@/modules/common/components/Layout';
import Select, { Option } from '@/modules/common/components/Form/Select';
import Checkbox from '@/modules/common/components/Form/Checkbox';

const ClubField = ({ value: fieldValue, options, onChange }: Props) => {
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
  options: Option[];
  onChange: (value: ClubValue) => void;
}

export default ClubField;
