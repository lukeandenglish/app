import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as R from 'ramda';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ForgotPassword from '../components/ForgotPassword';
import UpdateProfile from '../components/Profile/UpdateProfile/screen';
import CreateDeck from '../components/HomeScreen/CreateDeck/screen';
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
import {SlideRightFunc, SlideToTop} from './helper';
import jwtDecode from 'jwt-decode';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatchRedux = useDispatch();
  const initialGoogleSignUp = registerApi.endpoints.initialGoogleSignUp as any;
  let level;
  const hasTokenCreate = useSelector(
    R.pipe(R.path([REDUCER_PATH.USER]), R.path(['token', 'accessToken'])),
  );
  if (hasTokenCreate) {
    level = jwtDecode(hasTokenCreate);
  }
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
        {hasTokenCreate ? (
          <Stack.Group>
            {!level?.level && (
              <Stack.Group>
                <Stack.Screen
                  name={ROUTER_PAGE.AUTH.ProfileMain}
                  component={UpdateProfile}
                  options={SlideRightFunc(false)}
                />
              </Stack.Group>
            )}
            {level?.level && (
              <Stack.Group>
                <Stack.Screen
                  name={ROUTER_PAGE.AUTH.ProfileMain}
                  component={HomeScreen}
                  options={SlideRightFunc(false)}
                />
                <Stack.Screen
                  name={ROUTER_PAGE.AUTH.ProfileCreateCard}
                  component={CreateDeck}
                  options={SlideRightFunc(false)}
                />
                <Stack.Screen
                  name={ROUTER_PAGE.AUTH.ProfileUserCard}
                  component={UserCard}
                  options={SlideToTop(false)}
                />
                <Stack.Screen
                  name={ROUTER_PAGE.AUTH.ProfileSearchCard}
                  component={SearchScreen}
                  options={SlideRightFunc(false)}
                />
                <Stack.Screen
                  name={ROUTER_PAGE.AUTH.ProfileTest}
                  component={TestFlow}
                  options={SlideRightFunc(true)}
                />
                <Stack.Screen
                  name={ROUTER_PAGE.AUTH.ProfileApperance}
                  component={ApperanceProfile}
                  options={SlideRightFunc(true)}
                />
                <Stack.Screen
                  name={ROUTER_PAGE.TAB.Settings}
                  component={MainProfile}
                  options={SlideRightFunc(false)}
                />
                <Stack.Screen
                  name={ROUTER_PAGE.AUTH.ProfileEdit}
                  component={EditProfile}
                  options={SlideRightFunc(false)}
                />
              </Stack.Group>
            )}
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name={ROUTER_PAGE.UNAUTH.IntroOnBording}
              component={IntroOnBording}
              options={SlideRightFunc(false)}
            />
            <Stack.Screen
              name={ROUTER_PAGE.UNAUTH.ForgotPassword}
              component={ForgotPassword}
              options={SlideRightFunc(false)}
            />
            <Stack.Screen
              name={ROUTER_PAGE.UNAUTH.LogInOrRegister}
              component={LogInOrRegister}
              options={SlideRightFunc(false)}
            />
            <Stack.Screen
              name={ROUTER_PAGE.UNAUTH.Verification}
              component={ForgotPassword}
              options={SlideRightFunc(false)}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
