/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
