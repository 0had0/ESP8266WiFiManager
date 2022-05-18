import React from 'react';
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
} from 'native-base';

import settingsContext from '../../contexts/settings.context';

export const DNSAddressModal = ({onClose}) => {
  const {dnsAddress: defaultValue, setValue} =
    React.useContext(settingsContext);

  const [DNSAddress, setDNSAddress] = React.useState(defaultValue);

  const onConfirm = React.useCallback(
    value => setValue('dnsAddress', value),
    [setValue],
  );

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <Modal.Content maxWidth="md">
        <Modal.CloseButton />
        <Modal.Header>DNS Address</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>DNS EndPoint:</FormControl.Label>
            <InputGroup width="full">
              <InputLeftAddon children={'https://'} />
              <Input
                _disabled={{
                  backgroundColor: 'gray.800',
                }}
                flexGrow={1}
                value={DNSAddress}
                onChangeText={setDNSAddress}
                placeholder="esp.local"
              />
            </InputGroup>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                onConfirm(DNSAddress);
                onClose();
              }}>
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export const IPModal = ({onClose}) => {
  const {ip: defaultValue, setValue} = React.useContext(settingsContext);

  const [ip, setIp] = React.useState(defaultValue);

  const onConfirm = React.useCallback(
    value => setValue('ip', value),
    [setValue],
  );

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <Modal.Content maxWidth="md">
        <Modal.CloseButton />
        <Modal.Header>DNS Address</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Static IP:</FormControl.Label>
            <Input
              value={ip}
              onChangeText={setIp}
              placeholder="192.168.xxx.xxx"
              width="full"
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                onConfirm(ip);
                onClose();
              }}>
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
