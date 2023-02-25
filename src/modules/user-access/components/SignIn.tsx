import { ChangeEvent, useEffect, useState } from 'react';
import { SignInPayload } from '../model';
import { isAuthenticated, signIn } from '@/modules/common/services/api';
import TextField from '@/modules/common/components/Form/TextField';
import { userAccessActions } from '@/modules/user-access/redux/userAccessSlice';
import { connect, ConnectedProps } from 'react-redux';
import { User } from '@/modules/users/model';
import { RootState } from '@/modules/common/redux/store';
import { useRouter } from 'next/router';
import { Title } from '@/modules/common/components/Titles';
import styled from 'styled-components';
import { Button, LoadingButton } from '@/modules/common/components/Buttons';
import Paragraph from '@/modules/common/components/Paragraph';

const SignIn = (props: PropsFromRedux) => {
  const router = useRouter();
  const { isLoggedIn, userLoggedIn } = props;

  useEffect(() => {
    isLoggedIn && isAuthenticated().then(() => router.push({ pathname: '/matches' }));
  }, [isLoggedIn, router]);

  const [formData, setData] = useState<SignInPayload>({
    nickname: '',
    password: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof SignInPayload) =>
    setData(state => {
      return {
        ...state,
        [key]: e.target.value,
      } as SignInPayload;
    });

  return (
    <SignInWrapper>
      <Title>{`Indoor Lloret FCP`}</Title>
      <Paragraph>{`Inicio de sesión`}</Paragraph>

      {status === 'error' && (
        <>
          <Paragraph>{`Se ha producido un error`}</Paragraph>
          <Button onClick={() => setStatus('idle')}>{`Vuelve a intentarlo`}</Button>
        </>
      )}

      {status === 'success' && <Paragraph>{`Inicio de sesión correcto`}</Paragraph>}

      {['idle', 'loading'].includes(status) && (
        <Form
          noValidate
          autoComplete="off"
          onSubmit={async e => {
            e.preventDefault();
            setStatus('loading');
            const result = await signIn(formData);
            if (result.success) {
              userLoggedIn(result.result as User);
              setStatus('success');
            } else {
              setStatus('error');
            }
          }}
        >
          <TextField id="nickname" label="Nickname" onChange={e => onChange(e, 'nickname')} value={formData.nickname} />

          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={e => onChange(e, 'password')}
            value={formData.password}
          />

          <LoadingButton loading={status === 'loading'} type="submit">{`Acceder`}</LoadingButton>
        </Form>
      )}
    </SignInWrapper>
  );
};

const SignInWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;

const mapDispatchToProps = { ...userAccessActions };
const mapStateToProps = (state: RootState) => ({ isLoggedIn: state.userAccess.isLoggedIn });
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedSignIn = connector(SignIn);

export { SignIn };

export default ConnectedSignIn;
