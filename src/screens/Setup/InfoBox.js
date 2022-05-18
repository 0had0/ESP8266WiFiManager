import React from 'react';
import {Text, VStack} from 'native-base';

export default React.memo(() => {
  return (
    <VStack
      space={3}
      p={2}
      bg="emerald.400"
      borderWidth={4}
      borderRadius={4}
      borderColor="emerald.500">
      <Text color="white">
        <Text bold>1. First</Text> connect to the
        <Text bold> ESP8266 AP</Text> 📶🔎
      </Text>
      <Text color="white">
        <Text bold>2. Then</Text> choose the
        <Text bold> Wi-fi SSID </Text>from the list & enter the
        <Text bold> Password </Text> 🤨🤔
      </Text>
      <Text color="white">
        <Text bold>3. Finally </Text>wait till the
        <Text bold> ESP8266 </Text>reboot. 😊⌛
      </Text>
    </VStack>
  );
});
