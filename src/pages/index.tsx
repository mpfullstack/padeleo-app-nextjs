import Head from 'next/head';
import { Inter } from '@next/font/google';
import styled from 'styled-components';
import Switch from "@mui/material/Switch";
import DatePicker from '@/modules/components/DateTime/DatePicker';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <P>Hello World</P>
        <Switch {...label} />
        <DatePicker 
          date={new Date()}
          label="Start date"
          onChange={(date: Date | null) => {
            debugger;
          }}
        />
      </main>
    </>
  )
}

const P = styled.p`
  font-weight: bold;
  font-size: 2rem;
`;