import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import IntroOnBording from '../components/IntroOnBording/screen';
import LogInOrRegister from '../components/LogOrRegister/screen';
import ROUTER_PAGE from '../config/page';
import {ModalSlideFunc, SlideRightFunc} from './helper';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTER_PAGE.UNAUTH.IntroOnBording}>
        <Stack.Screen
          name={ROUTER_PAGE.UNAUTH.IntroOnBording}
          component={IntroOnBording}
          options={SlideRightFunc(false)}
        />
        <Stack.Screen
          name={ROUTER_PAGE.UNAUTH.LogInOrRegister}
          component={LogInOrRegister}
          options={ModalSlideFunc(false)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
