import React from 'react';
import {Dimensions} from 'react-native';
import {Container, useColorModeValue} from 'native-base';

const windowWidth = Dimensions.get('window').width;

export default (Screen, Wrapper) =>
  React.memo(props => {
    const Node = typeof Wrapper === 'function' ? Wrapper : Container;
    return (
      <Node
        width={windowWidth}
        height="full"
        p={5}
        bgColor={useColorModeValue('white', 'black')}
        maxWidth="full">
        <Screen {...props} />
      </Node>
    );
  });
