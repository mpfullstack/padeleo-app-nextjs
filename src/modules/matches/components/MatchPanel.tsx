import { ReactElement } from 'react';
import styled from 'styled-components';
import { useTheme, Theme } from '@mui/material/styles';
import EditIcon from '@/modules/common/icons/Edit';
import { IconButton } from '@/modules/common/components/Buttons/Buttons';
import Panel from '@/modules/common/components/Panel';
import { Row, Col } from '@/modules/common/components/Layout';
// import Tooltip from '../../common/components/Tooltip';

const MatchPanel = ({ title, onEdit, editLabel = 'Edit', children }: Props) => {
  const theme = useTheme();

  return (
    <RowPanel theme={theme}>
      <Col>
        <Panel
          title={title}
          action={
            onEdit && (
              // <Tooltip title={editLabel}>
              <IconButton color="primary" aria-label={editLabel} onClick={onEdit}>
                <EditIcon />
              </IconButton>
              // </Tooltip>
            )
          }
        >
          {children}
        </Panel>
      </Col>
    </RowPanel>
  );
};

const RowPanel = styled(Row)<{ theme: Theme }>`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  .MuiCardHeader-root {
    padding-top: 1.2rem;
    padding-bottom: 0.5rem;
  }
  .MuiCardHeader-title {
    font-size: 1.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.grey[900]};
  }
  .MuiCardContent-root {
    padding: 0.5rem 1.6rem;
    padding-top: 0;
    &:last-child {
      padding-bottom: 0.5rem;
    }
  }
  .MuiCardContent-root {
    font-weight: 800;
    font-size: 1.8rem;
    .text {
      margin: 0.5rem 0;
      .text-details {
        font-size: 1.5rem;
      }
    }
    .sub-text {
      font-size: 1.4rem;
      font-weight: 400;
      margin: 0 0 0.5rem 0;
    }
  }
`;

interface Props {
  title: string;
  onEdit?: () => void;
  editLabel: string;
  children: ReactElement;
}

export default MatchPanel;
