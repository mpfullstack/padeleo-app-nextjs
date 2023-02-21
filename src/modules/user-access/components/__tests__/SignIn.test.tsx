import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignIn } from '@/modules/user-access/components/SignIn';
import { setupMSWServer } from '@/mocks/server';
import { userAccessActions } from '../../redux/userAccessSlice';

const server = setupMSWServer();

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('SignIn', () => {
  it('Should render SignIn form', () => {
    render(<SignIn {...userAccessActions} />);

    expect(screen.queryByText(/SignIn/)).toBeInTheDocument();
  });

  it('Should Sign In user successfully', async () => {
    render(<SignIn {...userAccessActions} />);

    const nicknameInput = screen.getByLabelText('Nickname');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(nicknameInput, { target: { value: 'Nickname' } });
    fireEvent.change(passwordInput, { target: { value: 'Password' } });

    fireEvent.click(
      screen.getByRole('button', {
        name: /Sign In/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByText(/Sign In success/i)).toBeInTheDocument();
    });
  });

  it('Should give error on Sign In user with wrong credentials', async () => {
    render(<SignIn {...userAccessActions} />);

    const nicknameInput = screen.getByLabelText('Nickname');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(nicknameInput, { target: { value: 'WrongNickname' } });
    fireEvent.change(passwordInput, { target: { value: 'WrongPassword' } });

    fireEvent.click(
      screen.getByRole('button', {
        name: /Sign In/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByText(/Sign In error/i)).toBeInTheDocument();
    });
  });
});
