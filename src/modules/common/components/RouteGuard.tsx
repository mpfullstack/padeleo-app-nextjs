import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/modules/common/redux/store';
import { userAccessActions } from '@/modules/user-access/redux/userAccessSlice';
import styled from 'styled-components';

const publicPaths = ['/'];

const RouteGuard = (props: PropsFromRedux & { children: ReactElement }) => {
  const { children, isLoggedIn, setRedirectLink } = props;
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authCheck = () => {
      if (!isLoggedIn && !publicPaths.includes(router.asPath.split('?')[0])) {
        setAuthorized(false);
        setRedirectLink(router.asPath);
        router.push({ pathname: '/' });
      } else {
        setAuthorized(true);
      }
    };

    authCheck();

    const preventAccess = () => setAuthorized(false);

    router.events.on('routeChangeStart', preventAccess);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', preventAccess);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [router, router.events, isLoggedIn, setRedirectLink]);

  return authorized ? (
    children
  ) : (
    <Loading>
      <p>{`Loading...`}</p>
    </Loading>
  );
};

const Loading = styled.div`
  height: 100vh;
  width: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
`;

type PropsFromRedux = ConnectedProps<typeof connector>;

const mapDispatchToProps = { ...userAccessActions };
const mapStateToProps = (state: RootState) => ({ isLoggedIn: state.userAccess.isLoggedIn });
const connector = connect(mapStateToProps, mapDispatchToProps);
const ConnectedRouteGuard = connector(RouteGuard);

export default ConnectedRouteGuard;
