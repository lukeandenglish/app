import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as R from 'ramda';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IntroOnBording from '../components/IntroOnBording/screen';
import LogInOrRegister from '../components/LogOrRegister';
import ApperanceProfile from '../components/Profile/Apperance/screen';
import EditProfile from '../components/Profile/Edit/screen';
import MainProfile from '../components/Profile/Main/screen';
import HomeScreen from '../components/HomeScreen/Home/screen';
import ROUTER_PAGE from '../config/page';
import REDUCER_PATH from '../config/reducer/index';
import {registerApi} from '../redux/api/registerApi';
import {ModalSlideFunc, SlideRightFunc} from './helper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {Typography, FontFamily} from '../styleApp/Typografy';
import {LabelText} from '../styleApp/UI/LabelText';
import colors from '../styleApp/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {one} from '../assets/info';
import {create, card} from '../assets/svg/bottom-tabs';
import {Inset, Stack as InsetStack} from '../styleApp/Spacing';
import {t} from '@lingui/macro';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: insets.bottom,
        position: 'relative',
        backgroundColor: colors.lightPrimary,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}]}>
            <Inset
              top="s8"
              layout={StyleSheet.flatten([
                {
                  minWidth: 60,
                  minHeight: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                index === 1 && {position: 'absolute', top: -25},
              ])}>
              <SvgXml
                xml={R.cond([
                  [R.equals(1), R.always(create)],
                  [R.T, R.always(card)],
                  [R.F, R.always(card)],
                ])(index)}
              />
              <InsetStack size="s8" />
              <LabelText
                title={R.cond([
                  [R.equals(0), R.always(t`Мои колоды`)],
                  [R.equals(2), R.always(t`Исследовать`)],
                  [R.T, R.always(t`Создать`)],
                  [R.F, R.always(t`Создать`)],
                ])(index)}
                style={Object.assign([
                  Typography.text12,
                  {textAlign: 'center'},
                  FontFamily[400],
                  {color: colors.bodySecondary},
                ])}
              />
            </Inset>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name={ROUTER_PAGE.TAB.HOME}
        component={HomeScreen}
        options={SlideRightFunc(false)}
      />
      <Tab.Screen
        name={ROUTER_PAGE.TAB.CREATE}
        component={MainProfile}
        options={SlideRightFunc(false)}
      />
      <Tab.Screen
        name={ROUTER_PAGE.TAB.SETTINGS}
        component={MainProfile}
        options={SlideRightFunc(false)}
      />
    </Tab.Navigator>
  );
}

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
        {hasTokenCreate && (
          <Stack.Group>
            <Stack.Screen
              name={ROUTER_PAGE.AUTH.PROFILE_MAIN}
              component={MyTabs}
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
