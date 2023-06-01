import {t} from '@lingui/macro';
import * as React from 'react';
import {Text, TextInput, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {Switch} from '../../../assets/svg/switch';
import {useHookUserProfile} from '../../../hooks/useHookUserProfile';
import {Stack} from '../../../styleApp/Spacing';
import {AnimateIInput} from '../../../styleApp/UI/AnimatedUIInput';
import {default as colors} from '../../../styleApp/colors';
import {styles} from '../screen';

export function LoginSign() {
  const [state, {handleCheckboxAgree}] = useHookUserProfile();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const passwordRef = React.useRef<TextInput | null>(null);

  return (
    <>
      <View
        onTouchEnd={() => {
          scrollRef.current?.scrollToEnd();
        }}>
        <Stack size="s16" />
        <AnimateIInput
          ref={passwordRef}
          // secureTextEntry
          keyboardType="default"
          onScrollRef={() => {
            scrollRef.current?.scrollToEnd();
          }}
          {...state.password}
        />
        <Stack size="s16" />
        <AnimateIInput
          ref={passwordRef}
          // secureTextEntry
          keyboardType="default"
          onScrollRef={() => {
            scrollRef.current?.scrollToEnd();
          }}
          {...state.passwordRepeat}
        />
        <Stack size="s16" />
        <View style={[styles.checkbox, styles.checkboxFlexBox]}>
          <TouchableOpacity
            disabled={state.agreements.editable}
            onPress={handleCheckboxAgree}
            style={[
              styles.checkboxChild,
              styles.checkboxChildLayout,
              state.agreements.value && {
                backgroundColor: colors.actionColor,
              },
            ]}>
            {state.agreements.value ? (
              <SvgXml xml={Switch} width={15} height={15} />
            ) : (
              <View />
            )}
          </TouchableOpacity>
          <Text style={[styles.iAgreeWith, styles.fdfdfdfTypo]}>
            {t`I agree with all that`}
          </Text>
        </View>
      </View>
      <Stack size="s16" />
    </>
  );
}
