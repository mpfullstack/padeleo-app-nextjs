import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/modules/common/redux/store';

const publicPaths = ['/'];

const mapStateToProps = (state: RootState) => ({ isLoggedIn: state.userAccess.isLoggedIn });

const RouteGuard = (props: PropsFromRedux & { children: ReactElement }) => {
  const [authorized, setAuthorized] = useState(false);
  const { children, isLoggedIn } = props;
  const router = useRouter();

  useEffect(() => {
    const authCheck = () => {
      if (!isLoggedIn && !publicPaths.includes(router.asPath.split('?')[0])) {
        setAuthorized(false);
        // dispatch(setRedirectLink({ goto: router.asPath }));
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
  }, [router, router.events, isLoggedIn]);

  return authorized ? children : <p>{`Loading...`}</p>;
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedRouteGuard = connector(RouteGuard);

export default ConnectedRouteGuard;
