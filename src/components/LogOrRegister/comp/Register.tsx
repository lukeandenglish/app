import {t} from '@lingui/macro';
import * as React from 'react';
import {Text, TextInput, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useHookUserProfile} from '../../../hooks/useHookUserProfile';
import {Stack} from '../../../styleApp/Spacing';
import {AnimateIInput} from '../../../styleApp/UI/AnimatedUIInput';
import {default as colors} from '../../../styleApp/colors';
import {FontFamily, Typography} from '../../../styleApp/Typografy';
import {useNavigation} from '@react-navigation/native';
import ROUTER_PATH from '../../../config/page';
import {styles} from '../screen';

export function Register() {
  const [state] = useHookUserProfile();
  const navigation = useNavigation();

  const scrollRef = React.useRef<ScrollView | null>(null);
  const passwordRef = React.useRef<TextInput | null>(null);

  const onForgotPassword = () =>
    navigation.navigate(ROUTER_PATH.UNAUTH.ForgotPassword);

  return (
    <>
      <View
        onTouchEnd={() => {
          scrollRef.current?.scrollToEnd();
        }}>
        <Stack size="s16" />
        <AnimateIInput
          ref={passwordRef}
          secureTextEntry
          keyboardType="default"
          onScrollRef={() => {
            scrollRef.current?.scrollToEnd();
          }}
          {...state.password}
        />
      </View>

      <Stack size="s16" />
      <View style={[styles.checkbox, styles.checkboxFlexBox]}>
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
    </>
  );
}
