// @ts-nocheck
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking,
} from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Reactotron
  .configure({
    enabled: true,
    // host: '192.168.0.100',
    name: "React Native Demo", // server ip
    port: 9090
  })

  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-async-storage/async-storage` depending on where you get it from
  .use(reactotronRedux(false))
  // .use(trackGlobalErrors())
  .use(openInEditor())
  // .use(overlay())
  // .use(asyncStorage())
  .use(networking())
  .connect();
