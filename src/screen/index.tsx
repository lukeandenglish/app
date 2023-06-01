import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IntroOnBording from '../components/IntroOnBording/screen';
import LogInOrRegister from '../components/LogOrRegister/screen';
import ApperanceProfile from '../components/Profile/Apperance/screen';
import EditProfile from '../components/Profile/Edit/screen';
import MainProfile from '../components/Profile/Main/screen';
import ROUTER_PAGE from '../config/page';
import {registerApi} from '../redux/api/registerApi';
import {ModalSlideFunc, SlideRightFunc} from './helper';
import * as R from 'ramda';
import REDUCER_PATH from '../config/reducer/index';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen'



const Stack = createNativeStackNavigator();

const App = () => {
  const dispatchRedux = useDispatch();
  const initialGoogleSignUp = registerApi.endpoints.initialGoogleSignUp as any;
  const [hasTokenCreate] = useSelector(
    R.pipe(R.path([REDUCER_PATH.USER]), R.paths([['tokens', 'createdAt']])),
  );
  React.useEffect(() => {
    dispatchRedux(initialGoogleSignUp.initiate());
  }, []);

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(console.debug);
    return subscriber; // unsubscribe on unmount
  }, [hasTokenCreate]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTER_PAGE.UNAUTH.IntroOnBording}>
        {hasTokenCreate && (
          <Stack.Group>
            <Stack.Screen
              name={ROUTER_PAGE.AUTH.PROFILE_MAIN}
              component={MainProfile}
              options={SlideRightFunc(false)}
            />
            <Stack.Screen
              name={ROUTER_PAGE.AUTH.PROFILE_EDIT}
              component={EditProfile}
              options={SlideRightFunc(false)}
            />
            <Stack.Screen
              name={ROUTER_PAGE.AUTH.PROFILE_APPERANCE}
              component={ApperanceProfile}
              options={SlideRightFunc(true)}
            />
          </Stack.Group>
        )}
        {!hasTokenCreate && (
          <Stack.Group>
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
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
