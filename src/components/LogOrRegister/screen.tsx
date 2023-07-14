import {t} from '@lingui/macro';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {applehomeicon, googlehomeicon, nexthomeicon} from '../../assets/close';
import {ModalInput} from '../../modal/Word';
import {registerApi} from '../../redux/api/registerApi';
import {Layout} from '../../styleApp/Layout';
import {Queue, Stack} from '../../styleApp/Spacing';
import {FontFamily, Typography} from '../../styleApp/Typografy';
import {Units, isCalcSize} from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useRegisterAccount} from '../../hooks/useRegisterAccount';

export const ScrollContext = React.createContext(null);

const LogInOrRegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const ref = React.useRef(null);
  const {inputValue, buttonDisabled, inputPassword, handleLoginAccount} =
    useRegisterAccount();

  const handleSignApple = registerApi.endpoints.handleSignApple as any;
  const handleSignGoogle = registerApi.endpoints.handleSignGoogle as any;
  const dispatch = useDispatch();

  const onFocus = () => {
    setTimeout(() => {
      ref?.current?.scrollToEnd({animated: true});
    }, 500);
  };

  return (
    <ScrollView
      ref={ref}
      bounces={false}
      contentContainerStyle={[
        styles.growblock,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <Stack size="s12" />
      <View style={styles.flex}>
        <Stack size="s12" />
        <View style={styles.cen}>
          <View style={styles.ima} />
        </View>
        <Stack size="s36" />
        <Text style={[Typography.text38, FontFamily[400], {letterSpacing: 0}]}>
          {t`Начнём учить!`}
        </Text>
        <Stack size="s24" />
        <Text
          style={[Typography.text14, FontFamily[400], {letterSpacing: 0.1}]}>
          {t`Создайте аккаунт или войдите, если вы уже зарегистрированы`}
        </Text>
        <Stack size="s48" />
        <ModalInput inputName={{...inputValue, onFocus}} />
        <Stack size="s24" />
        <ModalInput inputName={{...inputPassword, onFocus}} />
        <Stack size="s24" />
        <View style={{alignItems: 'flex-end'}}>
          <View style={buttonDisabled && {opacity: 0.5}}>
            <TouchableOpacity
              disabled={buttonDisabled}
              onPress={handleLoginAccount}
              style={styles.nexicon}>
              <SvgXml xml={nexthomeicon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <KeyboardSpacer />
      <View>
        <Text
          style={[Typography.text14, {textAlign: 'center'}, FontFamily[400]]}>
          {t`Или войдите через`}
        </Text>
        <Stack size="s16" />
        <View style={styles.blockitem}>
          <View
            style={styles.soicon}
            onTouchStart={() => {
              dispatch(handleSignApple.initiate());
            }}>
            <SvgXml xml={applehomeicon} />
          </View>
          <Queue size="s16" />
          <View
            onTouchStart={() => {
              dispatch(handleSignGoogle.initiate());
            }}
            style={styles.soicon}>
            <SvgXml xml={googlehomeicon} />
          </View>
        </View>
      </View>
      <Stack size="s50" />
    </ScrollView>
  );
};

export default LogInOrRegisterScreen;

const styles = StyleSheet.create({
  blockitem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nexicon: {
    width: Units.s48,
    height: Units.s48,
    borderRadius: Units.s50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightInk,
  },
  ima: {
    borderWidth: Units.s1,
    height: isCalcSize(224),
    width: isCalcSize(193),
  },
  cen: {justifyContent: 'center', alignItems: 'center'},
  flex: {flex: 1},
  growblock: {
    backgroundColor: colors.lemon,
    flexGrow: 1,
    paddingHorizontal: Units.s20,
    borderWidth: Units.s1,
    minHeight: Layout.window.height,
  },
  soicon: {
    width: Units.s64,
    height: Units.s64,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Units.s1,
    borderRadius: Units.s50,
  },
});
