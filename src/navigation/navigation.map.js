const APP_NAME = 'ESP8266WiFiManager';
const generateScreenName = name => `${APP_NAME}-${name}`;

export default {
  setup: generateScreenName('setup'),
  home: generateScreenName('home'),
  settings: generateScreenName('settings'),
  tabs: generateScreenName('tabs'),
};
