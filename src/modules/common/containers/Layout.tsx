import Head from 'next/head';
import { ReactElement } from 'react';
import styled from 'styled-components';

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
  max-width: 120rem;
  width: 98%;
  margin: 2rem auto 0 auto;
`;

export default Layout;
