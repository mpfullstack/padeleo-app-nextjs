import { ChangeEvent, useState } from 'react';
import { signIn } from '@/modules/common/services/api';
import TextField from '@mui/material/TextField';
import { SignInPayload } from '../model';

const SignIn = () => {
  const [data, setData] = useState<SignInPayload>({
    nickname: '',
    password: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (status === 'success') {
    return <p>{`Sign In success`}</p>;
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof SignInPayload) =>
    setData(state => {
      return {
        ...state,
        [key]: e.target.value,
      } as SignInPayload;
    });

  return (
    <div>
      <p>{`SignIn`}</p>
      <form
        noValidate
        autoComplete="off"
        onSubmit={async e => {
          e.preventDefault();
          setStatus('loading');
          const result = await signIn(data as SignInPayload);
          if (result.success) {
            setStatus('success');
          }
        }}
      >
        <TextField
          id="nickname"
          label="Nickname"
          variant="outlined"
          onChange={e => onChange(e, 'nickname')}
          value={data.nickname}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={e => onChange(e, 'password')}
          value={data.password}
        />

        <button type="submit" data-testid="signin-button">{`Sign In`}</button>
      </form>
    </div>
  );
};

export default SignIn;
