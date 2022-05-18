import React, {memo} from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  useColorModeValue,
  useTheme,
  VStack,
} from 'native-base';
import LottieView from 'lottie-react-native';

import setupModeContext from '../../contexts/setupMode.context';

export default memo(() => {
  const {colors} = useTheme();
  const {setupMode} = React.useContext(setupModeContext);
  return (
    <VStack width="full" height="full">
      <Box flexGrow={1}>
        {setupMode === 0 ? (
          <LottieView
            source={require('./not_found.json')}
            loop={true}
            autoPlay
            style={{
              backgroundColor: useColorModeValue(colors.light, colors.black),
            }}
          />
        ) : (
          <Heading maxWidth="full">
            You are Connected to the
            <Text color="emerald.500"> ESP8266 </Text>
          </Heading>
        )}
      </Box>
      <Box>
        <Center pt={5} px={5}>
          <Text color="emerald.500" textAlign="center" bold mb={2}>
            No Module connected to your network!
          </Text>
        </Center>
        <Button
          width="full"
          bg="emerald.500"
          onPress={() => {
            console.log('searching');
          }}>
          Scan for connected module
        </Button>
        <Center pt={2} px={5} s>
          <Text color="emerald.500" textAlign="center" mb={2}>
            Please make sure your module is turned on and is not in setup mode
            then re-scan.
          </Text>
          <Text color="emerald.500" textAlign="center">
            If <Text bold>it</Text> is in setup Mode please connect to the
            module AP then re-launch then app.
          </Text>
        </Center>
      </Box>
    </VStack>
  );
});
