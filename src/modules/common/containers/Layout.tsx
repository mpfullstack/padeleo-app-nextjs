import Head from 'next/head';
import Image from 'next/image';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';

const Layout = ({ title, children }: Props): JSX.Element => {
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
      </header>
      <Main>{children}</Main>
    </>
  );
};

interface Props {
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

export default Layout;
