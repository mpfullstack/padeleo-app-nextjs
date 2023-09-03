import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { publicConfig } from '@/config';
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
import { Button, LoadingButton } from '@/modules/common/components/Buttons/Buttons';
import Paragraph from '@/modules/common/components/Paragraph';
import { useLoading } from '@/modules/common/hooks/useLoading';

const SignIn = (props: PropsFromRedux) => {
  const { isLoggedIn, userLoggedIn, userLoggedOut } = props;
  const router = useRouter();
  const [status, setStatus] = useLoading();

  useEffect(() => {
    isLoggedIn &&
      isAuthenticated()
        .then(() => router.push({ pathname: '/matches' }))
        .catch(() => userLoggedOut());
  }, [isLoggedIn, userLoggedOut, router]);

  const [formData, setData] = useState<SignInPayload>({
    nickname: '',
    password: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof SignInPayload) =>
    setData(state => {
      return {
        ...state,
        [key]: e.target.value,
      } as SignInPayload;
    });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const result = await signIn(formData);
    if (result.success) {
      userLoggedIn(result.result as User);
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <SignInWrapper>
      <Title>{publicConfig.appTitle}</Title>
      <Paragraph>{`Inicio de sesión`}</Paragraph>

      {status === 'error' && (
        <>
          <Paragraph>{`Se ha producido un error`}</Paragraph>
          <Button onClick={() => setStatus('idle')}>{`Vuelve a intentarlo`}</Button>
        </>
      )}

      {status === 'success' && <Paragraph>{`Inicio de sesión correcto`}</Paragraph>}

      {['idle', 'loading'].includes(status) && (
        <Form noValidate autoComplete="off" onSubmit={onSubmit}>
          <TextField
            id="nickname"
            label="Nombre de usuario"
            onChange={e => onChange(e, 'nickname')}
            value={formData.nickname}
          />

          <TextField
            id="password"
            label="Contraseña"
            type="password"
            onChange={e => onChange(e, 'password')}
            value={formData.password}
          />

          <ButtonWrapper>
            <LoadingButton loading={status === 'loading'} type="submit">{`Acceder`}</LoadingButton>
          </ButtonWrapper>
        </Form>
      )}
    </SignInWrapper>
  );
};

const SignInWrapper = styled.div`
  width: 100%;
  max-width: 36rem;
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

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const mapDispatchToProps = { ...userAccessActions };
const mapStateToProps = (state: RootState) => ({ isLoggedIn: state.userAccess.isLoggedIn });
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedSignIn = connector(SignIn);

export { SignIn };

export default ConnectedSignIn;
