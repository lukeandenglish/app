import {t} from '@lingui/macro';
import * as React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {Switch} from '../../../assets/svg/switch';
import {useHookUserProfile} from '../../../hooks/useHookUserProfile';
import {Stack} from '../../../styleApp/Spacing';
import {AnimateIInput} from '../../../styleApp/UI/AnimatedUIInput';
import colors from '../../../styleApp/colors';
import {Units, FontSize, Border} from '../../../styleApp/Units';
import {RV} from '../../../styleApp/Utils';
import {WIDTH} from '../../HomeScreen/Home/screen';

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

export const styles = StyleSheet.create({
  checkboxChildLayout: {
    height: 24,
    width: 24,
  },
  textPosition: {
    textAlign: 'center',
  },
  text1Typo: {
    fontSize: FontSize.subheading3_size,
    color: colors.lightInk,
  },
  buttonFlexBox: {
    justifyContent: 'center',
    padding: Units.p_base,
    borderRadius: Border.br_xs,
    alignItems: 'center',
    flexDirection: 'row',
    width: 343,
    left: 16,
  },
  logInOrClr: {
    color: colors.lightPrimary,
    textAlign: 'center',
  },
  fieldLayout: {
    height: 74,
    width: 343,
    left: 16,
    position: 'absolute',
    overflow: 'hidden',
  },
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
  button: {
    top: 332,
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
  },
  fdfdfdf: {
    textAlign: 'left',
    fontSize: FontSize.subheading3_size,
    color: colors.lightInk,
  },
  fdfdfdfWrapper: {
    top: 22,
    right: '0%',
    left: '0%',
    borderRadius: Border.br_81xl,
    backgroundColor: colors.whitesmoke_100,
    padding: Units.p_xl,
    width: '100%',
  },
  fieldName: {
    fontSize: FontSize.caption_size,
    color: colors.dimgray,
    textAlign: 'left',
    top: 0,
    left: 16,
    position: 'absolute',
  },
  field: {
    top: 443,
  },
  field1: {
    top: 533,
  },
  logInOr: {
    display: 'flex',
    width: 243,
    // fontFamily: FontFamily.graphikMedium,
    fontWeight: '500',
    color: colors.lightPrimary,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: FontSize.subheading3_size,
  },
  button3: {
    top: 745,
    backgroundColor: colors.actionColor,
    position: 'absolute',
  },
  checkboxChild: {
    borderRadius: Border.br_5xs,
    backgroundColor: colors.whitesmoke_200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iAgreeWith: {
    marginLeft: 12,
    textAlign: 'left',
    fontSize: FontSize.subheading3_size,
    color: colors.lightInk,
  },
  checkbox: {},
  logInOrRegister: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
});
