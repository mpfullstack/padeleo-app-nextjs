import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignIn } from '@/modules/user-access/containers/SignIn';
import { setupMSWServer } from '@/mocks/server';
import { userAccessActions } from '../../redux/userAccessSlice';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

const server = setupMSWServer();

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('SignIn', () => {
  it('Should render SignIn form', () => {
    render(<SignIn isLoggedIn={false} {...userAccessActions} />);

    expect(screen.queryByText(/Inicio de sesión/)).toBeInTheDocument();
  });

  it('Should Sign In user successfully', async () => {
    render(<SignIn isLoggedIn={false} {...userAccessActions} />);

    const nicknameInput = screen.getByLabelText('Nombre de usuario');
    const passwordInput = screen.getByLabelText('Contraseña');

    fireEvent.change(nicknameInput, { target: { value: 'Nickname' } });
    fireEvent.change(passwordInput, { target: { value: 'Password' } });

    fireEvent.click(
      screen.getByRole('button', {
        name: /Acceder/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByText(/Inicio de sesión correcto/i)).toBeInTheDocument();
    });
  });

  it('Should redirect user to matches page when logged in', async () => {
    render(<SignIn isLoggedIn={true} {...userAccessActions} />);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/matches',
        pathname: '/matches',
      });
    });
  });

  it('Should give error on Sign In user with wrong credentials', async () => {
    render(<SignIn isLoggedIn={false} {...userAccessActions} />);

    const nicknameInput = screen.getByLabelText('Nombre de usuario');
    const passwordInput = screen.getByLabelText('Contraseña');

    fireEvent.change(nicknameInput, { target: { value: 'WrongNickname' } });
    fireEvent.change(passwordInput, { target: { value: 'WrongPassword' } });

    fireEvent.click(
      screen.getByRole('button', {
        name: /Acceder/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByText(/Se ha producido un error/i)).toBeInTheDocument();
    });
  });
});
