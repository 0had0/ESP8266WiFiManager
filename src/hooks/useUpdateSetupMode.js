import React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';

import setupModeContext from '../contexts/setupMode.context';
import usePrevious from './usePrevious';

const checkIfAP = async () =>
  await axios({
    method: 'GET',
    url: 'http://foo.bar/isAP',
  });

export default enabled => {
  const {changeSetupModeTo} = React.useContext(setupModeContext);

  const {isLoading, isSuccess, refetch, data, isRefetching, isError} = useQuery(
    'isAP',
    checkIfAP,
    {
      enabled,
    },
  );

  const oldData = usePrevious(data?.data);
  React.useEffect(() => {
    if (!isLoading && oldData !== data?.data) {
      if (isSuccess) {
        changeSetupModeTo(!!data?.data?.result ? 1 : 2);
      } else if (isError) {
        changeSetupModeTo(0);
      }
    }
  }, [isLoading, isError, isSuccess, data]);
  return {isLoading, refetch, isRefetching};
};
