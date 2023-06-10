import {t} from '@lingui/macro';
import * as React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  Layout as RNRLayout,
  ZoomInLeft,
  ZoomOutRight,
} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';
import {Switch} from '../../../assets/svg/switch';
import {useHookUserProfile} from '../../../hooks/useHookUserProfile';
import {Stack} from '../../../styleApp/Spacing';
import {AnimateIInput} from '../../../styleApp/UI/AnimatedUIInput';
import {Border, Units, isCalcSize} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';
import {ScrollContext} from '../screen';

function LoginSign() {
  const [input, {handleCheckboxAgree}] = useHookUserProfile();
  const passwordRef = React.useRef<TextInput | null>(null);
  const passwordRepeatRef = React.useRef<TextInput | null>(null);
  const {onScroll} = React.useContext(ScrollContext);

  const funcMoveNext = pos => () => {
    if (pos === 1) {
      input.password?.onEndEditing();
    }
    if (pos === 2) {
      input.passwordRepeat?.onEndEditing();
    }
  };

  return (
    <Animated.View
      entering={ZoomInLeft}
      exiting={ZoomOutRight}
      layout={RNRLayout.duration(1400).delay(1400)}>
      <TouchableWithoutFeedback onPress={onScroll}>
        <Stack size="s16" />
        <AnimateIInput
          ref={passwordRef}
          keyboardType="default"
          {...input.password}
          onEndEditing={funcMoveNext(1)}
          onNextFocus={() => {
            console.log('Next focus');
            passwordRepeatRef.current?.focus();
          }}
        />
        <Stack size="s16" />
        <AnimateIInput
          ref={passwordRepeatRef}
          keyboardType="default"
          {...input.passwordRepeat}
          onEndEditing={funcMoveNext(2)}
        />
        <Stack size="s16" />
        <View style={[styles.checkboxFlexBox]}>
          <TouchableOpacity
            disabled={input.agreements.editable}
            onPress={handleCheckboxAgree}
            style={[
              styles.checkboxChild,
              styles.checkboxChildLayout,
              input.agreements.value && {
                backgroundColor: colors.actionColor,
              },
            ]}>
            {input.agreements.value ? (
              <SvgXml xml={Switch} width={15} height={15} />
            ) : (
              <View />
            )}
          </TouchableOpacity>
          <Text style={[styles.iAgreeWith, styles.fdfdfdfTypo]}>
            {t`I agree with all that`}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Stack size="s16" />
    </Animated.View>
  );
}

export default LoginSign;

const styles = StyleSheet.create({
  checkboxChildLayout: {
    height: isCalcSize(24),
    width: isCalcSize(24),
  },
  checkboxFlexBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  fdfdfdfTypo: {
    textAlign: 'left',
  },

  checkboxChild: {
    borderRadius: Border.br_5xs,
    backgroundColor: colors.whitesmoke_200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iAgreeWith: {
    marginLeft: isCalcSize(12),
    textAlign: 'left',
    fontSize: Units.s14,
    color: colors.lightInk,
  },
});
