import { ChangeEvent, useState } from 'react';
import { SignInPayload } from '../model';
import { signIn } from '@/modules/common/services/api';
import TextField from '@/modules/common/components/Form/TextField';
import { userAccessActions } from '@/modules/user-access/redux/userAccessSlice';
import { connect, ConnectedProps } from 'react-redux';
import { User } from '@/modules/users/model';
import Link from 'next/link';

const mapDispatchToProps = { ...userAccessActions };

const SignIn = (props: PropsFromRedux) => {
  const { userLoggedIn } = props;

  const [data, setData] = useState<SignInPayload>({
    nickname: '',
    password: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (status === 'success') {
    return (
      <div>
        <Link href={`/matches`}>{`Go to matches`}</Link>
        <p>{`Sign In success`}</p>
      </div>
    );
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
          if (result.success) {
            userLoggedIn(result.result as User);
            setStatus('success');
          } else {
            setStatus('error');
          }
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

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedSignIn = connector(SignIn);

export { SignIn };

export default ConnectedSignIn;
