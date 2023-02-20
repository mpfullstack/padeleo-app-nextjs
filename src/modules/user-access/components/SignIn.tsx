import { ChangeEvent, useState } from 'react';
import { SignInPayload } from '../model';
import { signIn } from '@/modules/common/services/api';
import TextField from '@/modules/common/components/Form/TextField';

const SignIn = () => {
  const [data, setData] = useState<SignInPayload>({
    nickname: '',
    password: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (status === 'success') {
    return <p>{`Sign In success`}</p>;
  }

  if (status === 'error') {
    return <p>{`Sign In error`}</p>;
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
          result.success ? setStatus('success') : setStatus('error');
        }}
      >
        <TextField id="nickname" label="Nickname" onChange={e => onChange(e, 'nickname')} value={data.nickname} />

        <TextField
          id="password"
          label="Password"
          type="password"
          onChange={e => onChange(e, 'password')}
          value={data.password}
        />

        <button type="submit">{`Sign In`}</button>
      </form>
    </div>
  );
};

export default SignIn;
