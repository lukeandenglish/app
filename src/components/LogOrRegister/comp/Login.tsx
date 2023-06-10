import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  Layout as RNRLayout,
  ZoomInLeft,
  ZoomOutRight,
} from 'react-native-reanimated';
import ROUTER_PATH from '../../../config/page';
import {useHookUserProfile} from '../../../hooks/useHookUserProfile';
import {Stack} from '../../../styleApp/Spacing';
import {FontFamily, Typography} from '../../../styleApp/Typografy';
import {AnimateIInput} from '../../../styleApp/UI/AnimatedUIInput';
import {FontSize} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';
import {ScrollContext} from '../screen';

function Login() {
  const [input] = useHookUserProfile();
  const navigation = useNavigation();
  const {onScroll} = React.useContext(ScrollContext);

  const passwordRef = React.useRef<TextInput | null>(null);

  const onForgotPassword = () =>
    navigation.navigate(ROUTER_PATH.UNAUTH.ForgotPassword);

  const funcMoveInput = pos => () => {
    onScroll();
    if (pos === 1) {
      passwordRef.current?.focus();
    }
  };

  return (
    <Animated.View
      entering={ZoomInLeft}
      exiting={ZoomOutRight}
      layout={RNRLayout.duration(1400).delay(1400)}>
      <View>
        <Stack size="s16" />
        <AnimateIInput
          ref={passwordRef}
          secureTextEntry
          keyboardType="default"
          {...input.passwordLogin}
          onNextFocus={Keyboard.dismiss}
          // onScrollRef={funcMoveInput(1)}
        />
      </View>

      <Stack size="s16" />
      <View style={[styles.checkboxFlexBox]}>
        <TouchableOpacity disabled={false} onPress={onForgotPassword}>
          <Text
            style={[
              styles.iAgreeWith,
              styles.fdfdfdfTypo,
              {color: colors.actionColor},
              FontFamily['500'],
              Typography.text14,
            ]}>
            {t`Forget password?`}
          </Text>
        </TouchableOpacity>
      </View>
      <Stack size="s32" />
    </Animated.View>
  );
}

export default Login;

const styles = StyleSheet.create({
  checkboxFlexBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  fdfdfdfTypo: {
    textAlign: 'left',
  },

  text: {
    fontSize: FontSize.heading1_size,
    lineHeight: 40,
    color: colors.lightInk,
  },
  text1: {
    lineHeight: 22,
    textAlign: 'center',
  },
  iAgreeWith: {
    marginLeft: 12,
    textAlign: 'left',
    fontSize: FontSize.subheading3_size,
    color: colors.lightInk,
  },
});
