import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import settings from '../../assets/svg/settings';
import {useHookChangeProfile} from '../../hooks/useHookChangeProfile';
import {Inset, Queue, Stack} from '../../styleApp/Spacing';
import {Styles} from '../../styleApp/Styles';
import {FontFamily, Typography} from '../../styleApp/Typografy';
import {LabelText} from '../../styleApp/UI/LabelText';
import {Units, isCalcSize} from '../../styleApp/Units';
import colors, {cardColor} from '../../styleApp/colors';
import {t} from '@lingui/macro';
import {useProfileHook} from '../../hooks/useProfileHook';

export const SmallCardProfile = () => {
  const [state] = useHookChangeProfile();
  const insets = useSafeAreaInsets();
  const {name, levelEnglish, dictionaryTotal, time, navigateBtn} =
    useProfileHook();

  return (
    <React.Fragment>
      <Inset
        horizontal="s20"
        bottom="s24"
        layout={StyleSheet.flatten(
          Object.assign([
            styles.block,
            {
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingTop: Units.s20 + insets.top,
            },
          ]),
        )}>
        <View style={styles.rowBlock}>
          <TouchableOpacity onPress={state.image?.onPress}>
            <ImageBackground
              imageStyle={styles.ImageStyle}
              {...state.image}
              resizeMode="cover"
              style={Object.assign([
                styles.customImage,
                state?.image?.style ?? {},
              ])}>
              {state.image?.children() ?? <View />}
            </ImageBackground>
          </TouchableOpacity>
          <Queue size="s16" />
        </View>

        <TouchableOpacity
          onPress={navigateBtn.toProfile}
          style={styles.settingBtn}>
          <SvgXml xml={settings} />
        </TouchableOpacity>
      </Inset>
      <Inset
        horizontal="s20"
        bottom="s24"
        layout={StyleSheet.flatten([styles.block])}>
        <LabelText
          mode="desc"
          title={name.value}
          style={Object.assign([
            {color: colors.lightInk},
            Typography.text30,
            FontFamily.wermut,
          ])}
        />
        <Stack size="s16" />
        <LabelText
          mode="desc"
          title={levelEnglish.value}
          style={Object.assign([
            {color: colors.lightInk},
            Typography.text14,
            FontFamily['400'],
          ])}
        />
      </Inset>
      <Inset
        horizontal="s20"
        bottom="s24"
        layout={StyleSheet.flatten([styles.block, styles.rowBlock])}>
        <View style={styles.rowBlock}>
          <View style={Styles.flex1}>
            <LabelText
              mode="desc"
              title={dictionaryTotal.value}
              style={Object.assign([
                {color: colors.lightInk},
                Typography.text30,
                FontFamily.wermut,
              ])}
            />
            <LabelText
              mode="desc"
              title={t`Словарный запас`}
              style={Object.assign([
                {color: colors.lightInk},
                Typography.text14,
                FontFamily['400'],
              ])}
            />
          </View>
          <Queue size="s16" />
          <View style={Styles.flex1}>
            <LabelText
              mode="desc"
              title={time.value}
              style={Object.assign([
                {color: colors.lightInk},
                Typography.text30,
                FontFamily.wermut,
              ])}
            />
            <LabelText
              mode="desc"
              title={t`Время учёбы`}
              style={Object.assign([
                {color: colors.lightInk},
                Typography.text14,
                FontFamily['400'],
              ])}
            />
          </View>
        </View>
      </Inset>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  rowBlock: {flexDirection: 'row'},
  settingBtn: {width: isCalcSize(24), height: isCalcSize(24)},
  ImageStyle: {borderRadius: Units.s16, overflow: 'hidden'},
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
});
