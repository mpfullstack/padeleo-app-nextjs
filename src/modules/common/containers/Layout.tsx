import Head from 'next/head';
import Image from 'next/image';
import { userAccessActions } from '@/modules/user-access/redux/userAccessSlice';
import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/modules/common/redux/store';
import { logout } from '@/modules/common/services/api';
import LogoutIcon from '@/modules/common/icons/Logout';
import { IconButton } from '@/modules/common/components/Buttons';

const Layout = ({ title, userLoggedOut, isLoggedIn, type = 'common', children }: Props): JSX.Element => {
  const theme = useTheme();
  const logoSize = type === 'interior' ? 28 : 36;
  const onClickLogout = async (e: any) => {
    e.preventDefault();
    await logout();
    userLoggedOut();
  };

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
      <Header type={type}>
        <Logo>
          <Image src="/logo-main.png" width={logoSize} height={logoSize} alt="Padeleo" />
          <Span color={theme.palette.secondary.main}>{`Padeleo`}</Span>
        </Logo>
        {isLoggedIn && (
          <Logout>
            <IconButton onClick={onClickLogout}>
              <LogoutIcon />
            </IconButton>
          </Logout>
        )}
      </Header>
      <Main>{children}</Main>
    </>
  );
};

type LayoutType = 'common' | 'interior';

interface Props extends PropsFromRedux {
  children: ReactElement;
  title: string;
  type?: LayoutType;
}

const innerContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 64rem;
  width: 96%;
  margin: 2rem auto 0 auto;
`;

const Main = styled.main`
  ${innerContainer};
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const Span = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  margin-left: 0.5rem;
`;

const interiorLayout = css`
  margin-top: 0;
  align-items: flex-start;
  flex-direction: row;
  ${Logo} {
    margin-top: 0.4rem;
  }
  ${Span} {
    display: none;
  }
`;

const Header = styled.header<{ type: LayoutType }>`
  ${innerContainer};
  ${({ type }) => type === 'interior' && interiorLayout}
`;

const Logout = styled.div`
  margin-left: auto;
  font-size: 1.4rem;
  svg {
    font-size: 2rem;
  }
`;

const mapDispatchToProps = { ...userAccessActions };
const mapStateToProps = (state: RootState) => ({ isLoggedIn: state.userAccess.isLoggedIn });
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedLayout = connector(Layout);

export { Layout };

export default ConnectedLayout;
