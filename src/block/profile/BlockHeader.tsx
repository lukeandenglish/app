/* eslint-disable react-native/no-inline-styles */
import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  TouchableOpacity as RNTouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import goBack from '../../assets/svg/goBack';
import ROUTER_PATH from '../../config/page';
import {useHookUserProfile} from '../../hooks/useHookUserProfile';
import {Inset, Queue, Stack} from '../../styleApp/Spacing';
import {Typography} from '../../styleApp/Typografy';
import {AnimateIInput} from '../../styleApp/UI/AnimatedUIInput';
import {Button} from '../../styleApp/UI/Button';
import {Units} from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import settings from '../../assets/svg/settings';

export const BlockHeader = ({small = false}: {small: boolean}) => {
  const [state, {onChangeEmail, onChangePassword, onChangeName}] =
    useHookUserProfile();
  const navigation = useNavigation();
  const disabled = false;
  const handleSignAppele = () => {};
  const insets = useSafeAreaInsets();
  const emailRef = React.useRef<TextInput | null>(null);
  const passwordRef = React.useRef<TextInput | null>(null);
  const nameRef = React.useRef<TextInput | null>(null);

  switch (small) {
    case true:
      return (
        <React.Fragment>
          <Inset
            horizontal="s16"
            vertical="s16"
            layout={StyleSheet.flatten([
              styles.block,
              styles.rowBlock,
              {
                paddingTop: insets.top,
                flexDirection: 'row',
              },
            ])}>
            <View style={styles.rowBlock}>
              <TouchableOpacity onPress={state.image?.onPress}>
                <ImageBackground
                  imageStyle={styles.ImageStyle}
                  {...state.image}
                  style={[styles.customImage, state.image.style]}>
                  {state.image?.children() ?? <View />}
                </ImageBackground>
              </TouchableOpacity>
              <Queue size="s16" />
              <View style={styles.nameUser}>
                <Text style={[styles.textStyle, Typography.text20]}>
                  {state.name.name}
                </Text>
                <Text style={[styles.textStyle, Typography.text20]}>
                  {state.name.surname}
                </Text>
              </View>
              <View />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTER_PATH.AUTH.PROFILE_EDIT)}
              style={styles.settingBtn}>
              <SvgXml xml={settings} />
            </TouchableOpacity>
          </Inset>
        </React.Fragment>
      );
    case false:
      return (
        <React.Fragment>
          <Inset
            horizontal="s16"
            vertical="s16"
            layout={StyleSheet.flatten([
              styles.block,
              {
                backgroundColor: colors.transparent,
                paddingTop: insets.top,
                position: 'relative',
              },
            ])}>
            <RNTouchableOpacity
              onPress={navigation.goBack}
              style={[
                styles.rnTouchStyle,
                {
                  top: insets.top + Units.s8,
                },
              ]}>
              <SvgXml xml={goBack} />
            </RNTouchableOpacity>
            <TouchableOpacity onPress={state.image?.onPress}>
              <ImageBackground
                {...state.image}
                imageStyle={styles.ImageStyle}
                style={[styles.customImage, state.image.style]}>
                {state.image?.children()}
              </ImageBackground>
            </TouchableOpacity>
          </Inset>
          <Inset horizontal="s12" bottom="s24" top="s40">
            <AnimateIInput
              ref={emailRef}
              editable
              blurOnSubmit
              keyboardType="email-address"
              onEndEditing={onChangeEmail}
              {...state.email}
            />
            <Stack size="s16" />
            <AnimateIInput
              ref={passwordRef}
              editable
              blurOnSubmit
              keyboardType="default"
              onEndEditing={onChangePassword}
              {...state.password}
            />
            <Stack size="s16" />
            <AnimateIInput
              ref={nameRef}
              editable
              blurOnSubmit
              keyboardType="default"
              onEndEditing={onChangeName}
              {...state.name}
            />
          </Inset>
          <Inset horizontal="s12" vertical="s12">
            <Button
              disabled={disabled}
              onPress={handleSignAppele}
              title={t`Log out`}
              styleText={styles.btnLogOutTxt}
              style={styles.logOutBtn}
            />
            <Stack size="s16" />
            <Button
              disabled={disabled}
              onPress={handleSignAppele}
              title={t`Delete account`}
              styleText={styles.deleteBtnTxt}
              style={styles.deleteAccountBtn}
            />
          </Inset>
        </React.Fragment>
      );
  }
};

export const styles = StyleSheet.create({
  rnTouchStyle: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: Units.s8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBlock: {flexDirection: 'row'},
  nameUser: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  settingBtn: {width: 24, height: 24},
  ImageStyle: {borderRadius: Units.s16, overflow: 'hidden'},
  deleteBtnTxt: {color: colors.alert},
  btnLogOutTxt: {color: colors.lightPrimary},
  logOutBtn: {backgroundColor: colors.lightInk},
  deleteAccountBtn: {
    backgroundColor: colors.transparent,
    borderColor: colors.alert,
    borderWidth: 1,
  },
  block: {
    backgroundColor: colors.pink,
    height: 151,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customImage: {
    width: 75,
    height: 75,
    borderRadius: Units.s16,
    backgroundColor: colors.transparent,
  },
  textStyle: {
    textAlign: 'left',
    fontWeight: '500',
    lineHeight: 24,
    color: colors.black,
  },
  scrolView: {
    flexGrow: 1,
    backgroundColor: colors.transparent,
  },
});
