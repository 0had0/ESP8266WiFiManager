import React, {memo} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {
  Button,
  Center,
  CheckIcon,
  FormControl,
  Icon,
  Input,
  Select,
  Spinner,
  Stack,
  useColorModeValue,
  VStack,
  WarningOutlineIcon,
  useTheme,
} from 'native-base';
import {MaterialIcons} from '@native-base/icons';
import {useQuery} from 'react-query';

import InfoBox from './InfoBox';
import axios from 'axios';
import useUpdateSetupMode from '../../hooks/useUpdateSetupMode';

const getSSIDS = async () => await axios.get('http://foo.bar/getAvaibleSSIDS');
// await new Promise(res => {
//   setTimeout(() => {
//     res(['Cup of Tea', 'Louise']);
//   }, 10000);
// });
// await fetch('foo.bar/getSSIDS').then(res => res.json());

const connect = async (ssid, password) =>
  await axios.get(`http://foo.bar/connect?ssid=${ssid}&pass=${password}`);
// await new Promise(res => {
//   setTimeout(() => {
//     console.log(ssid, password);
//     res();
//   }, 5000);
// });

export default memo(() => {
  const {colors} = useTheme();
  const [selectedSSID, setSelectedSSID] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [show, setShow] = React.useState(false);

  const {
    isLoading: isLoadingSSIDs,
    data,
    refetch: refetchSSIDs,
    isRefetching,
  } = useQuery('ssids', getSSIDS);
  const {refetch} = useUpdateSetupMode(false);

  const ssids = data?.data ?? [];

  const {
    isRefetching: isConnecting,
    refetch: connectToNetwork,
    isSuccess,
  } = useQuery(
    ['connect', selectedSSID, password],
    () => connect(selectedSSID, password),
    {
      enabled: false,
      manual: true,
      placeholderData: [],
    },
  );
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={refetchSSIDs}
          refreshing={isRefetching}
          colors={[colors.emerald[500]]}
          progressBackgroundColor="#fff"
        />
      }>
      <VStack space={5}>
        <InfoBox />
        <FormControl isRequired width="full" maxWidth="full">
          <Stack width="full" maxWidth="full">
            <FormControl.Label>SSID</FormControl.Label>
            <Select
              dropdownIcon={
                isLoadingSSIDs && <Spinner color="emerald.500" mx={5} />
              }
              isDisabled={
                isLoadingSSIDs || !Array.isArray(ssids) || isConnecting
              }
              selectedValue={selectedSSID}
              minWidth="200"
              width="full"
              accessibilityLabel="Choose SSID"
              placeholder="Choose SSID"
              _selectedItem={{
                bg: useColorModeValue('emerald.300', 'emerald.500'),
                endIcon: (
                  <CheckIcon
                    color={useColorModeValue('black', 'white')}
                    size="5"
                  />
                ),
              }}
              onValueChange={itemValue => {
                setSelectedSSID(itemValue);
                setPassword('');
              }}>
              {ssids?.map(ssid => (
                <Select.Item key={ssid} label={ssid} value={ssid} />
              ))}
            </Select>
            <FormControl.HelperText>
              Select your router SSID
            </FormControl.HelperText>
            <FormControl.Label mt="3">Password</FormControl.Label>
            <Input
              isDisabled={isLoadingSSIDs || !selectedSSID || isConnecting}
              value={password}
              width="full"
              type={show ? 'text' : 'password'}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShow(!show)}
                />
              }
              placeholder="Password"
              onChangeText={value => setPassword(value)}
            />
            <FormControl.HelperText>
              Must be atleast 6 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
            <Button
              isLoading={isConnecting}
              onPress={() => {
                connectToNetwork(selectedSSID, password);
                if (isSuccess) {
                  refetch();
                }
              }}
              isDisabled={!selectedSSID || !password || isConnecting}
              mt={5}
              bg="emerald.500"
              endIcon={<Icon as={MaterialIcons} name="link" size="md" />}>
              Connect
            </Button>
          </Stack>
        </FormControl>
      </VStack>
    </ScrollView>
  );
});
