import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {closeSvgNavigate} from '../../assets/close';
import {ModalInput} from '../../modal/Word';
import {Inset, Stack} from '../../styleApp/Spacing';
import {FontFamily, Typography} from '../../styleApp/Typografy';
import {Button} from '../../styleApp/UI/Button';
import {LabelText} from '../../styleApp/UI/LabelText';
import {Units, isCalcSize} from '../../styleApp/Units';
import colors, {cardColor} from '../../styleApp/colors';
import {Styles} from '../../styleApp/Styles';
import {useEditProfile} from '../../hooks/useEditProfile';

export const ProfileEdit = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const {inputName, inputEmail, btn, inputSurname, inputPhone} =
    useEditProfile();

  return (
    <React.Fragment>
      <Inset
        horizontal="s20"
        layout={StyleSheet.flatten([
          styles.block,
          {
            backgroundColor: colors.transparent,
            position: 'relative',
            paddingTop: insets.top,
          },
        ])}>
        <View style={styles.rowBlock}>
          <View style={Styles.flex1} />
          <TouchableOpacity onPress={navigation.goBack} style={styles.cbp}>
            <SvgXml
              xml={closeSvgNavigate}
              width={Units.s24}
              height={Units.s24}
            />
          </TouchableOpacity>
        </View>
        <LabelText
          mode="desc"
          title={t`Личные данные`}
          style={Object.assign([
            {color: colors.lightInk},
            Typography.text30,
            FontFamily.wermut,
          ])}
        />
      </Inset>
      <Stack size="s36" />
      <Inset horizontal="s20" bottom="s24">
        <ModalInput inputName={inputName} />
        <Stack size="s24" />
        <ModalInput inputName={inputSurname} />
        <Stack size="s24" />
        <ModalInput inputName={inputPhone} />
        <Stack size="s24" />
        <ModalInput inputName={inputEmail} />
      </Inset>
      <KeyboardSpacer />
      <Inset horizontal="s20" vertical="s12">
        <Button
          {...btn.logOut}
          styleText={styles.btnLogOutTxt}
          style={styles.logOutBtn}
        />
        <Stack size="s16" />
        <Button
          {...btn.onDelete}
          styleText={styles.deleteBtnTxt}
          style={styles.deleteAccountBtn}
        />
        <Stack size="s16" />
        <Button
          {...btn.setBaseLevel}
          styleText={styles.deleteBtnTxt}
          style={styles.deleteAccountBtn}
        />
      </Inset>
    </React.Fragment>
  );
};

export const styles = StyleSheet.create({
  cbp: {
    width: isCalcSize(34),
    height: isCalcSize(34),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rnTouchStyle: {
    width: isCalcSize(50),
    height: isCalcSize(50),
    position: 'absolute',
    left: Units.s4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBlock: {flexDirection: 'row'},
  nameUser: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  settingBtn: {width: isCalcSize(24), height: isCalcSize(24)},
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
    backgroundColor: cardColor.Neon_Lemon,
    alignItems: 'flex-start',
  },
  customImage: {
    width: isCalcSize(75),
    height: isCalcSize(75),
    borderRadius: Units.s16,
    backgroundColor: colors.transparent,
  },
  textStyle: {
    textAlign: 'left',
    fontWeight: '500',
    lineHeight: isCalcSize(24),
    color: colors.lightInk,
  },
  scrolView: {
    flexGrow: 1,
    backgroundColor: colors.transparent,
  },
});
