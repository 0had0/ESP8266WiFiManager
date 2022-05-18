import React from 'react';

import settingsContext from '../contexts/settings.context';

const DEFAULT_VALUE = {
  ip: '192.168.1.xxx',
  dnsAddress: 'esp.local',
  isUsingStaticIp: false,
};

export default () => {
  const {set, get} = React.useContext(settingsContext);
  const [loading, setLoading] = React.useState(true);
  const [values, setValues] = React.useState(DEFAULT_VALUE);

  React.useEffect(() => {
    async function getAll() {
      setLoading(true);
      await Promise.all([get('ip'), get('dnsAddress'), get('isUsingStaticIp')])
        .then(v => {
          setValues({
            ip: v[0],
            dnsAddress: v[1],
            isUsingStaticIp: v[2],
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setValues(DEFAULT_VALUE);
          setLoading(false);
        });
    }
    getAll();
  }, []);

  const setValue = React.useCallback(
    (key, value) => {
      set(key, typeof value === 'string' ? value : JSON.stringify(value))
        .then(() => {
          setValues({...values, [key]: value});
        })
        .catch(err => console.error(err));
    },
    [values, setValues],
  );

  return {...values, setValue, loading};
};
