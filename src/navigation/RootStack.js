import React from 'react';
import {
  IconButton,
  MoonIcon,
  SunIcon,
  useColorModeValue,
  useColorMode,
  useTheme,
  Heading,
  StatusBar,
  KeyboardAvoidingView,
  Icon,
} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@native-base/icons';

import {Setup, Home, Settings} from '../screens';
import navigationMap from './navigation.map';
import setupModeContext from '../contexts/setupMode.context';
import WithContainerHoc from '../HOC/WithContainer.hoc';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HeaderTitle = ({children}) => <Heading>{children}</Heading>;

export default () => {
  const {colors} = useTheme();
  const {toggleColorMode} = useColorMode();
  const {setupMode} = React.useContext(setupModeContext);

  return (
    <>
      <StatusBar
        barStyle={useColorModeValue('dark-content', 'light-content')}
        backgroundColor={useColorModeValue(colors.white, colors.black)}
      />
      <Stack.Navigator>
        {setupMode === 1 ? (
          <Stack.Screen
            options={{
              title: 'Setup your Connection',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: useColorModeValue(colors.white, colors.black),
              },
              headerTitle: HeaderTitle,
              headerRight: () => (
                <IconButton
                  onPress={toggleColorMode}
                  icon={useColorModeValue(
                    <MoonIcon color="emerald.500" />,
                    <SunIcon color="emerald.500" />,
                  )}
                />
              ),
            }}
            name={navigationMap.setup}
            component={WithContainerHoc(Setup, props => (
              <KeyboardAvoidingView behavior="position" {...props} />
            ))}
          />
        ) : (
          <Stack.Screen
            name={navigationMap.tabs}
            options={{headerShown: false}}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  tabBarActiveTintColor: colors.emerald[500],
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: useColorModeValue(
                      colors.white,
                      colors.black,
                    ),
                  },
                  tabBarStyle: {
                    elevation: 0,
                    borderTopWidth: 0,
                    backgroundColor: useColorModeValue(
                      colors.white,
                      colors.black,
                    ),
                  },
                  headerTitle: HeaderTitle,
                  headerRight: () => (
                    <IconButton
                      mx={2}
                      onPress={toggleColorMode}
                      icon={useColorModeValue(
                        <MoonIcon color="emerald.500" />,
                        <SunIcon color="emerald.500" />,
                      )}
                    />
                  ),
                }}>
                <Tab.Screen
                  options={{
                    title: 'Home',
                    tabBarIcon: ({color, size}) => (
                      <Icon
                        as={MaterialIcons}
                        name="home"
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                  name={navigationMap.home}
                  component={WithContainerHoc(Home)}
                />
                <Tab.Screen
                  options={{
                    title: 'Settings',
                    tabBarIcon: ({color, size}) => (
                      <Icon
                        as={MaterialIcons}
                        name="settings"
                        color={color}
                        disabled={setupMode === 0}
                        size={size}
                      />
                    ),
                  }}
                  name={navigationMap.settings}
                  component={WithContainerHoc(Settings)}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </>
  );
};
