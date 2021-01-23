/** @format */

import { AppRegistry } from 'react-native';
import App from './src/app';
import HeadlessNotifications from './src/app/HeadlessNotifications';
import { name as appName } from './app.json';


AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => HeadlessNotifications); // <-- Add this line
