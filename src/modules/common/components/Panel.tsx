import { ReactElement } from 'react';
import Card, { CardHeader, CardContent } from '@/modules/common/components/Card';

const Panel = ({ children, title, action }: Props) => {
  return (
    <Card>
      <CardHeader className="card-header" title={<span className="panel-title">{title}</span>} action={action} />
      <CardContent className="card-content">{children}</CardContent>
    </Card>
  );
};

interface Props {
  children: ReactElement;
  title: string;
  action?: ReactElement;
}

export default Panel;
