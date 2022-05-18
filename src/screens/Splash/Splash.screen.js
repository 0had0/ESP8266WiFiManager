import React from 'react';
import {Modal} from 'react-native';
import {
  Box,
  Heading,
  HStack,
  Spinner,
  useColorModeValue,
  useTheme,
} from 'native-base';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';

import useUpdateSetupMode from '../../hooks/useUpdateSetupMode';

const Splashscreen = () => {
  const {colors} = useTheme();

  const {isLoading} = useUpdateSetupMode(true);

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setHasAnimationPlayedOnce(true);
    }, 2000);
    SplashScreen.hide();
  }, []);

  const [hasAnimationPlayedOnce, setHasAnimationPlayedOnce] =
    React.useState(false);

  const isModalVisible = React.useMemo(
    () => isLoading || !hasAnimationPlayedOnce,
    [hasAnimationPlayedOnce, isLoading],
  );

  return (
    <Modal visible={isModalVisible} animationType="fade">
      <LottieView
        source={useColorModeValue(
          require('./loading.light.json'),
          require('./loading.dark.json'),
        )}
        loop={true}
        autoPlay
        style={{backgroundColor: useColorModeValue(colors.light, colors.black)}}
      />
      <Box style={{position: 'absolute', bottom: 100, left: 0}} width="full">
        <HStack space={2} justifyContent="center">
          <Spinner color="emerald.500" accessibilityLabel="Loading posts" />
          <Heading color="emerald.500" fontSize="md">
            Connecting to ESP8266 ...
          </Heading>
        </HStack>
      </Box>
    </Modal>
  );
};

export default React.memo(Splashscreen);
