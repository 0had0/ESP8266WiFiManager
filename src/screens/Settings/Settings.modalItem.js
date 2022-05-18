import React from 'react';
import {Button, FormControl, Input, Modal} from 'native-base';
import SettingsItem from './Settings.item';

const ModalContainer = ({onConfirm, defaultValue, ...props}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue ?? '');
  return (
    <>
      <SettingsItem {...props} onPress={() => setShowModal(true)} />
      <Modal
        avoidKeyboard
        isOpen={showModal}
        onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{props.title}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>{`New ${props.title}`}</FormControl.Label>
              <Input value={value} onChangeText={setValue} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  onConfirm(value);
                  setShowModal(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default React.memo(ModalContainer);
