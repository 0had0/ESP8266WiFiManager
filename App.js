/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient, QueryClientProvider} from 'react-query';

import RootStack from './src/navigation/RootStack';
import SetupModeContext from './src/contexts/setupMode.context';
import {SplashScreen} from './src/screens';

const defaultQueryFn = async ({queryKey}) => {
  const {data} = await axios.get(`https://foo.bar${queryKey[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // queryFn: defaultQueryFn,
    },
  },
});

const App: () => Node = () => {
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@my-app-color-mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        console.log(e);
        return 'light';
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem('@my-app-color-mode', value);
      } catch (e) {
        console.log(e);
      }
    },
  };

  const [setupMode, setSetupMode] = React.useState(0);
  // const [loading, setIsLoading] = React.useState(true);

  const changeSetupModeTo = React.useCallback(
    (value: 0 | 1 | 2) => {
      // 0: not set yet
      // 1: is setup mode
      // 2: is not setup mode
      setSetupMode(value);
    },
    [setSetupMode],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <NativeBaseProvider colorModeManager={colorModeManager}>
          <SetupModeContext.Provider
            value={{
              isSetupMode: setupMode === 1,
              changeSetupModeTo,
              setupMode,
            }}>
            <SplashScreen />
            <RootStack />
          </SetupModeContext.Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
