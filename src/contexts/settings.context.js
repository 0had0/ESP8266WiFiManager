import react from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const settingsManager = {
  get: async key => {
    try {
      let val = await AsyncStorage.getItem(`@app-settings-${key}`);
      return val;
    } catch (e) {
      console.error(e);
    }
  },
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(`@app-settings-${key}`, value);
    } catch (e) {
      console.error(e);
    }
  },
};

export default react.createContext(settingsManager);
