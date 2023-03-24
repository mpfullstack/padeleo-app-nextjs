import { render, screen } from '@testing-library/react';
import MatchItem from '@/modules/matches/components/MatchItem/MatchItem';
import { match, closedMatch } from '@/mocks/matches/data';
import { addSeconds } from '@/modules/common/services/dates';
import { user } from '@/mocks/users/data';

describe('MatchItem', () => {
  it('Should render MatchItem', () => {
    render(<MatchItem match={match} user={user} onUpdate={() => null} />);

    expect(screen.queryByText(/Padel Indoor Lloret/)).toBeInTheDocument();
  });

  it('Should render correct match start time and duration', () => {
    const { container } = render(<MatchItem match={match} user={user} onUpdate={() => null} />);

    expect(container).toHaveTextContent('miércoles 08/02/2023');
    const date = new Date(match.startTime);
    const endDate = addSeconds(date, match.duration);
    expect(container).toHaveTextContent(`De ${date.getHours()}:00 a ${endDate.getHours()}:30`);
  });

  it('Should render missing players', () => {
    const { container } = render(<MatchItem match={match} user={user} onUpdate={() => null} />);

    expect(container).toHaveTextContent('Faltan3');
  });

  it('Should render closed match status', () => {
    const { container } = render(<MatchItem match={closedMatch} user={user} onUpdate={() => null} />);

    expect(container).toHaveTextContent('Cerrado');
  });
});
