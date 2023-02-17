import Head from 'next/head';
import Switch from '@mui/material/Switch';
import DatePicker from '@/modules/common/components/DateTime/DatePicker';
import TimePicker from '@/modules/common/components/DateTime/TimePicker';
import MatchDateTime, { DateTime } from '@/modules/matches/components/MatchDateTime';

export default function Home() {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  return (
    <>
      <Head>
        <title>{`Create Next App`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Switch {...label} />
        <DatePicker date={new Date()} label="Start date" onChange={(date: Date | null) => {}} />
        <TimePicker date={new Date()} label="Start time" onChange={(date: Date | null) => {}} />
        <MatchDateTime onChange={(date: DateTime) => {}} />
      </main>
    </>
  );
}
