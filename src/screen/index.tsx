import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as R from 'ramda';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ForgotPassword from '../components/ForgotPassword';
import HomeScreen from '../components/HomeScreen/Home/screen';
import SearchScreen from '../components/HomeScreen/SearchScreen/screen';
import UserCard from '../components/HomeScreen/UserCard/screen';
import IntroOnBording from '../components/IntroOnBording/screen';
import LogInOrRegister from '../components/LogOrRegister';
import ApperanceProfile from '../components/Profile/Apperance/screen';
import EditProfile from '../components/Profile/Edit/screen';
import MainProfile from '../components/Profile/Main/screen';
import {TestFlow} from '../components/TestFlow/screen';
import ROUTER_PAGE from '../config/page';
import REDUCER_PATH from '../config/reducer/index';
import {registerApi} from '../redux/api/registerApi';
import {ModalSlideFunc, SlideRightFunc, SlideToTop} from './helper';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatchRedux = useDispatch();
  const initialGoogleSignUp = registerApi.endpoints.initialGoogleSignUp as any;

  const hasTokenCreate = useSelector(
    R.pipe(R.path([REDUCER_PATH.USER]), R.path(['tokens', 'createdAt'])),
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
        {!hasTokenCreate && (
          <Stack.Group>
            <Stack.Screen
              name={ROUTER_PAGE.AUTH.PROFILE_MAIN}
              component={HomeScreen}
              options={SlideRightFunc(false)}
            />
            <Stack.Screen
              name={ROUTER_PAGE.AUTH.PROFILE_SEARCH_CARD}
              component={SearchScreen}
              options={SlideRightFunc(false)}
            />
            <Stack.Screen
              name={ROUTER_PAGE.AUTH.PROFILE_USER_CARD}
              component={UserCard}
              options={SlideToTop(false)}
            />
            <Stack.Screen
              name={ROUTER_PAGE.TAB.SETTINGS}
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
            <Stack.Screen
              name={ROUTER_PAGE.AUTH.PROFILE_TEST}
              component={TestFlow}
              options={SlideRightFunc(true)}
            />
          </Stack.Group>
        )}
        {hasTokenCreate && (
          <Stack.Group>
            <Stack.Screen
              name={ROUTER_PAGE.UNAUTH.IntroOnBording}
              component={IntroOnBording}
              options={SlideRightFunc(false)}
            />
            <Stack.Screen
              name={ROUTER_PAGE.UNAUTH.ForgotPassword}
              component={ForgotPassword}
              options={ModalSlideFunc(false)}
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
