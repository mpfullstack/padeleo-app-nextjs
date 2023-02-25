import React, { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { userAccessActions } from '@/modules/user-access/redux/userAccessSlice';
import { SWRConfig } from 'swr/_internal';

const SWRCustomConfig = (props: PropsFromRedux & { children: ReactElement }) => {
  const { children, userLoggedOut } = props;

  return (
    <SWRConfig
      value={{
        onError: error => {
          if (error.status === 401) userLoggedOut();
          // TODO: Handle other errors
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

type PropsFromRedux = ConnectedProps<typeof connector>;

const mapDispatchToProps = { ...userAccessActions };
const connector = connect(null, mapDispatchToProps);
const ConnectedSWRCustomConfig = connector(SWRCustomConfig);

export default ConnectedSWRCustomConfig;
