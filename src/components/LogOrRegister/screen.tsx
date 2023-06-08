/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useButtonRegister} from '../../hooks/useButtonRegister';
import {useHookUserProfile} from '../../hooks/useHookUserProfile';
import {useIsVisibleKeyboard} from '../../hooks/useIsVisibleKeyboard';
import {Inset, Stack} from '../../styleApp/Spacing';
import {AnimateIInput} from '../../styleApp/UI/AnimatedUIInput';
import {Button} from '../../styleApp/UI/Button';
import {Border, FontSize, Units, isCalcSize} from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import {BlockSelect} from './comp/BlockSelect';
import {LoginSign} from './comp/LoginSign';
import {Register} from './comp/Register';

const LogInOrRegisterScreen = ({disabled = false}: {disabled?: boolean}) => {
  const {BtnProps, isRegister} = useButtonRegister();
  const {isKeyboardVisible} = useIsVisibleKeyboard();
  const [input] = useHookUserProfile();
  const insets = useSafeAreaInsets();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const emailRef = React.useRef<TextInput | null>(null);

  const moveToButton = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd();
    });
  };

  return (
    <View style={[styles.wrapper]}>
      <View
        style={[
          styles.blc,
          {
            paddingBottom: insets.bottom,
          },
        ]}>
        <ScrollView
          bounces={false}
          ref={scrollRef}
          contentContainerStyle={styles.cnt}>
          <View>
            <Inset horizontal="s16" layout={styles.insctx}>
              <BlockSelect disabled={disabled} />
              <Stack size="s16" />
              <View style={styles.line} />
              <Stack size="s32" />
              <View
                style={{
                  position: 'relative',
                }}
              />
              <View onTouchStart={moveToButton}>
                <AnimateIInput
                  ref={emailRef}
                  keyboardType="email-address"
                  onScrollRef={moveToButton}
                  {...input.email}
                />
                {!isRegister && <Register onFocus={moveToButton} />}
                {isRegister && <LoginSign onFocus={moveToButton} />}
              </View>
            </Inset>
          </View>
        </ScrollView>
        <KeyboardSpacer />
        <Inset
          horizontal="s16"
          bottom="s6"
          layout={StyleSheet.flatten(
            Object.assign([
              styles.btnMode,
              isKeyboardVisible && {display: 'none'},
            ]),
          )}>
          <Button
            {...BtnProps}
            styleText={styles.btnclr}
            style={Object.assign([
              {
                backgroundColor: colors.actionColor,
              },
              isKeyboardVisible && {display: 'none'},
            ])}
          />
        </Inset>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnMode: {bottom: 0},
  btnclr: {color: colors.lightPrimary},
  insctx: {
    flex: 1,
  },
  btnswn: {
    width: isCalcSize(20),
    height: isCalcSize(20),
  },
  swm: {
    position: 'absolute',
    right: 0,
    top: -isCalcSize(30),
    flexDirection: 'row',
  },
  line: {
    height: 1,
    borderBottomWidth: 1,
    borderColor: colors.stroke,
  },
  cnt: {flexGrow: 1},
  wrapper: {
    flex: 1,
    backgroundColor: colors.transparent,
  },
  blc: {
    flex: 1,
    borderTopRightRadius: Border.br_base,
    backgroundColor: colors.lightPrimary,
    borderTopLeftRadius: Border.br_base,
  },
  checkboxChildLayout: {
    height: isCalcSize(24),
    width: isCalcSize(24),
  },
  textPosition: {
    textAlign: 'center',
  },
  text: {
    fontSize: FontSize.heading1_size,
    lineHeight: isCalcSize(40),
    color: colors.lightInk,
  },
  button: {
    top: isCalcSize(332),
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
  logInOr: {
    display: 'flex',
    width: isCalcSize(243),
    fontWeight: '500',
    color: colors.lightPrimary,
    height: isCalcSize(16),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: FontSize.subheading3_size,
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

export default LogInOrRegisterScreen;
