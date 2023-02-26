import Head from 'next/head';
import Image from 'next/image';
import { userAccessActions } from '@/modules/user-access/redux/userAccessSlice';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import Link from 'next/link';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/modules/common/redux/store';
import { logout } from '@/modules/common/services/api';

const Layout = ({ title, userLoggedOut, isLoggedIn, children }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - ` : ''}
          {`Padel Lloret FCP - Padeleo App`}
        </title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Logo>
          <Image src="/logo-main.png" width={36} height={36} alt="Padeleo" />
          <Span>{`Padeleo`}</Span>
        </Logo>
        {isLoggedIn && (
          <Link
            href="/"
            onClick={async e => {
              e.preventDefault();
              await logout();
              userLoggedOut();
            }}
          >
            {`Cerrar sesión`}
          </Link>
        )}
      </header>
      <Main>{children}</Main>
    </>
  );
};

interface Props extends PropsFromRedux {
  children: ReactElement;
  title: string;
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 64rem;
  width: 98%;
  margin: 2rem auto 0 auto;
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Span = muiStyled('span')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.secondary.main,
  marginLeft: '.5rem',
}));

const mapDispatchToProps = { ...userAccessActions };
const mapStateToProps = (state: RootState) => ({ isLoggedIn: state.userAccess.isLoggedIn });
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedLayout = connector(Layout);

export { Layout };

export default ConnectedLayout;
