import React from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {useQuery} from 'react-query';
import axios from 'axios';

import useUpdateSetupMode from '../../hooks/useUpdateSetupMode';
import setupModeContext from '../../contexts/setupMode.context';
import useSettingsValue from '../../hooks/useSettingsValue';

import SettingsItem from './Settings.item';
import SettingsModalItem from './Settings.modalItem';

const resetAPI = async path => {
  console.log(`http://${path}/reset`);
  return await axios({method: 'GET', url: `http://${path}/reset`});
};

export default () => {
  const {setuoMode} = React.useContext(setupModeContext);
  const {ip, dnsAddress, isUsingStaticIp, setValue, loading} =
    useSettingsValue();

  const {refetch} = useQuery(
    ['reset', isUsingStaticIp ? ip : `${dnsAddress}.local`],
    () => resetAPI(isUsingStaticIp ? ip : `${dnsAddress}.local`),
    {enabled: false},
  );

  const {refetch: update} = useUpdateSetupMode(false);

  const toggleIsUsingStaticIp = React.useCallback(
    () => setValue('isUsingStaticIp', !isUsingStaticIp),
    [isUsingStaticIp, setValue],
  );

  return loading ? (
    <Center width="full" height="full">
      <Center>
        <Spinner />
      </Center>
    </Center>
  ) : (
    <VStack width="full" height="full">
      <Box flexGrow={1}>
        <SettingsModalItem
          title="DNS Address"
          isDisabled={JSON.parse(isUsingStaticIp)}
          description={dnsAddress}
          defaultValue={dnsAddress}
          onConfirm={newValue => setValue('dnsAddress', newValue)}
        />
        <SettingsItem
          title="Use Static IP"
          description="case of DNS failure or multi-module"
          onPress={toggleIsUsingStaticIp}
          icon={() => (
            <Checkbox
              accessibilityLabel="is-using-static-ip"
              isChecked={JSON.parse(isUsingStaticIp)}
              onChange={toggleIsUsingStaticIp}
              size="md"
              colorScheme="emerald"
            />
          )}
        />
        <SettingsModalItem
          title="Static IP"
          isDisabled={!JSON.parse(isUsingStaticIp)}
          description={ip}
          defaultValue={ip}
          onConfirm={newValue => setValue('ip', newValue)}
        />
      </Box>
      {setuoMode == 2 && (
        <Box>
          <Button
            width="full"
            bg="error.500"
            onPress={() => {
              refetch();
              update();
            }}>
            Reset configuration
          </Button>
          <Center pt={5} px={5}>
            <Text color="error.500" textAlign="center">
              This will make the module reboot and you will return to the setup
              screen
            </Text>
          </Center>
        </Box>
      )}
    </VStack>
  );
};
