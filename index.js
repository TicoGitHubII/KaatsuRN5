/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppContainer from './App';
import {name as appName} from './app.json';
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent(appName, () => AppContainer);
