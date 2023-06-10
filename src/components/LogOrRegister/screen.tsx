/* eslint-disable react-native/no-inline-styles */
import * as R from 'ramda';
import * as React from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useButtonRegister} from '../../hooks/useButtonRegister';
import {useHookUserProfile} from '../../hooks/useHookUserProfile';
import {useIsVisibleKeyboard} from '../../hooks/useIsVisibleKeyboard';
import {Inset, Stack} from '../../styleApp/Spacing';
import {AnimateIInput} from '../../styleApp/UI/AnimatedUIInput';
import {Button} from '../../styleApp/UI/Button';
import {Border} from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import {BlockSelect} from './comp/BlockSelect';
import Login from './comp/Login';
import Register from './comp/Register';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {
  placeHolderNameLogin,
  placeHolderNameRegister,
} from './placeHolderNameRegister';

export const ScrollContext = React.createContext(null);

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
    }, 350);
  };

  return (
    <ScrollContext.Provider value={{onScroll: moveToButton}}>
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
                    placeholderName={R.cond([
                      [
                        R.equals(true),
                        R.always(placeHolderNameRegister(input)),
                      ],
                      [R.equals(false), R.always(placeHolderNameLogin(input))],
                    ])(isRegister)}
                  />
                  {!isRegister && <Login />}
                  {isRegister && <Register />}
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
    </ScrollContext.Provider>
  );
};

const styles = StyleSheet.create({
  btnMode: {bottom: 0},
  btnclr: {color: colors.lightPrimary},
  insctx: {
    flex: 1,
  },
  line: {
    height: 1,
    borderBottomWidth: 1,
    borderColor: colors.stroke,
  },
  cnt: {flexGrow: 1, paddingBottom: 100},
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
});

export default LogInOrRegisterScreen;
