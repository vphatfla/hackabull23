/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faS, faR, faAlignRight, faGear, faLayerGroup, faMicrochip, faCaretDown, faCaretUp, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import App from './App';
import {name as appName} from './app.json';
library.add(faS, faAlignRight, faGear, faLayerGroup, faR, faMicrochip, faCaretDown, faCaretUp, faArrowRight)
AppRegistry.registerComponent(appName, () => App);
