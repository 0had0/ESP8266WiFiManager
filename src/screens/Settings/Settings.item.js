import React from 'react';
import {
  Heading,
  HStack,
  Pressable,
  Text,
  Icon,
  VStack,
  useColorModeValue,
  Box,
} from 'native-base';
import {MaterialIcons} from '@native-base/icons';

const SettingsItem = ({
  title,
  description,
  onPress,
  style,
  showEditIcon = true,
  icon: CustomIcon,
  isDisabled = false,
}): Node => {
  return (
    <Pressable
      onPress={() => {
        if (typeof onPress == 'function') {
          onPress();
        }
      }}>
      {({isPressed}) => (
        <HStack
          my={1}
          style={{
            alignItems: 'center',
            transform: [
              {
                scale: isPressed ? 0.96 : 1,
              },
            ],
          }}>
          <VStack flexGrow={1} style={[style]}>
            <Heading
              color={
                isDisabled
                  ? useColorModeValue('gray.200', 'gray.800')
                  : useColorModeValue('darkText', 'lightText')
              }
              size="md">
              {title}
            </Heading>
            <Text
              color={
                isDisabled
                  ? useColorModeValue('gray.200', 'gray.800')
                  : useColorModeValue('darkText', 'lightText')
              }>
              {description}
            </Text>
          </VStack>
          {showEditIcon && CustomIcon ? (
            <CustomIcon isDisabled={isDisabled} size={6} />
          ) : (
            <Box>
              <Icon
                as={MaterialIcons}
                name="edit"
                color={
                  isDisabled
                    ? useColorModeValue('gray.200', 'gray.800')
                    : useColorModeValue('darkText', 'lightText')
                }
                size={6}
              />
            </Box>
          )}
        </HStack>
      )}
    </Pressable>
  );
};

export default React.memo(SettingsItem);
