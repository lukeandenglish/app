import {t} from '@lingui/macro';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {apperance, lang, reminder} from '../../../assets/svg/apperance';
import next, {checkboxSvg} from '../../../assets/svg/next';
import {BlockHeader} from '../../../block/profile/BlockHeader';
import {Inset, Stack} from '../../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../../styleApp/Typografy';
import {LabelText} from '../../../styleApp/UI/LabelText';
import {isCalcSize} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';
import {GroupPlayComponent} from './GroupPlayComponent';

export default () => {
  const insets = useSafeAreaInsets();

  const MAINER = [
    {
      title: t`Напоминания`,
      value: t`Мы будем отправлять вам пуши каждые 5 минут`,
      onPress: () => null,
      svg: apperance,
    },
    {
      title: t`Соглашение о конфиденциальности`,
      value: null,
      onPress: () => null,
      svg: lang,
    },
    {
      title: t`Пользовательское соглашение`,
      value: null,
      svg: reminder,
      onPress: () => null,
      noBottom: true,
    },
  ];

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={[
        styles.scrolView,
        {
          paddingBottom: insets.bottom,
          backgroundColor: colors.lightPrimary,
        },
      ]}>
      <BlockHeader small={true} />
      <GroupPlayComponent />
      <Inset horizontal="s20">
        {MAINER.map((item, index) => (
          <View key={[index, 'first'].join('_')}>
            <Inset
              vertical="s16"
              layout={StyleSheet.flatten(
                Object.assign([
                  styles.itemBlock,
                  item.noBottom && {borderBottomWidth: 0},
                ]),
              )}>
              <View style={styles.row}>
                <View style={[Styles.flex1, {width: isCalcSize(231)}]}>
                  <LabelText
                    mode="desc"
                    title={item.title}
                    style={Object.assign([
                      FontFamily['500'],
                      {color: colors.lightInk},
                      Typography.text14,
                    ])}
                  />
                  <Stack size={'s6'} />
                  {item.value && (
                    <LabelText
                      mode="notify"
                      title={item.value}
                      style={Object.assign([
                        {color: colors.lightInk},
                        Typography.text14,
                        FontFamily['400'],
                      ])}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity
                onPress={item.onPress}
                style={styles.borderIcon}>
                {index === 0 ? (
                  <SvgXml xml={checkboxSvg} />
                ) : (
                  <SvgXml xml={next} />
                )}
              </TouchableOpacity>
            </Inset>
          </View>
        ))}
      </Inset>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  borderIcon: {
    height: isCalcSize(30),
    minWidth: isCalcSize(30),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  itemBlock: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.dot,
  },
  scrolView: {
    flexGrow: 1,
    backgroundColor: colors.transparent,
  },
});
