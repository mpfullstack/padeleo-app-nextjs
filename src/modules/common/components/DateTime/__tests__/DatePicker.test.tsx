import { render, screen } from '@testing-library/react';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

describe('DatePicker and DatePicker', () => {
  it('Should render DatePicker label', () => {
    render(<DatePicker label="Match date" date={new Date()} onChange={() => null} />);

    expect(screen.queryByLabelText(/Match date/)).toBeInTheDocument();
  });

  it('Should render TimePicker correct time', () => {
    const time = new Date();
    time.setHours(22);
    time.setMinutes(21);
    render(<TimePicker label="Match time" date={time} onChange={() => null} />);

    expect(screen.queryByLabelText(/10:21 PM/)).toBeInTheDocument();
  });
});
