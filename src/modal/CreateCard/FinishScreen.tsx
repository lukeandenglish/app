import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  FadeOutDown,
  Layout as RNRLayout,
  ZoomInUp,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {playSvg} from '../../assets/close';
import {Inset, Stack} from '../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../styleApp/Typografy';
import {Units, isCalcSize} from '../../styleApp/Units';
import {cardColor} from '../../styleApp/colors';
import {HeaderModal, ModalButton} from '../Word';

export const Card = ({
  title,
  selectColor,
  photo,
  count,
  learnCount,
  onPress,
}) => {
  console.log(photo);
  return (
    <Animated.View
      entering={ZoomInUp}
      exiting={FadeOutDown}
      layout={RNRLayout.duration(1400).delay(1400)}>
      <View
        style={[
          styles.iwp,
          {
            backgroundColor: selectColor,
            borderColor: selectColor,
          },
        ]}>
        <Inset
          vertical="s12"
          horizontal="s24"
          layout={StyleSheet.flatten(styles.cicq)}>
          <Image
            source={{
              uri: photo.url,
            }}
            style={{height: isCalcSize(189), width: isCalcSize(163)}}
          />
        </Inset>
        <View style={[styles.cw, {backgroundColor: selectColor}]}>
          <Stack size="s6" />
          <View style={styles.wt}>
            <Text style={[Typography.text18, styles.wtt, FontFamily[500]]}>
              {title.length >= 27 ? [R.take(27)(title), '...'].join('') : title}
            </Text>
          </View>
          <Stack size="s12" />
          <View style={{borderBottomWidth: Units.s1}} />
          <Stack size="s12" />
          <View style={styles.wtd}>
            <View>
              <Text style={[styles.wtd1, Typography.text12, FontFamily[400]]}>
                {[learnCount, ' / ', count].join('')}
              </Text>
              <Text
                style={[
                  styles.wtd2,
                  Typography.text12,
                  FontFamily[400],
                ]}>{t`Слов выучено`}</Text>
            </View>
            <TouchableOpacity disabled={!onPress} onPress={onPress}>
              <SvgXml
                xml={playSvg}
                width={isCalcSize(36)}
                height={isCalcSize(36)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export const FinishScreen = ({
  selectColor,
  setSelectColor,
  onClose,
  onBack,
  title,
  disabled,
  handleCreateCard,
  photo,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <BottomSheetScrollView
        contentContainerStyle={[
          styles.fgctx,
          {
            paddingBottom: insets.bottom,
          },
        ]}>
        <HeaderModal title={t`Название`} onClose={onClose} onBack={onBack} />
        <View style={styles.cwc}>
          <Card
            title={title}
            selectColor={selectColor}
            photo={photo}
            count={0}
            learnCount={0}
            onPress={null}
          />
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {R.values(cardColor).map(color => (
              <View style={[styles.bsc, color === selectColor && styles.cbs]}>
                <TouchableOpacity
                  onPress={() => setSelectColor(color)}
                  style={[
                    Styles.iconClose,
                    styles.sbc,
                    {
                      backgroundColor: color,
                    },
                  ]}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View
          style={[
            styles.btnWe,
            {
              marginBottom: insets.bottom,
            },
          ]}
        />
      </BottomSheetScrollView>
      <ModalButton
        title={t`Cоздать`}
        onPress={handleCreateCard}
        disabled={disabled}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  cicq: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cwc: {alignItems: 'center', justifyContent: 'center'},
  fgctx: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Units.s24,
  },
  cbs: {
    borderWidth: Units.s2,
  },
  bsc: {
    padding: Units.s2,
    borderRadius: Units.s50,
    width: Units.s64,
    height: Units.s64,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Units.s20,
  },
  sbc: {
    borderRadius: Units.s50,
    width: Units.s50,
    height: Units.s50,
  },
  btnWe: {
    width: 100,
    height: 50,
  },
  wtd2: {fontWeight: '400'},
  wtd1: {fontWeight: '600'},
  wtd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wtt: {
    fontWeight: '600',
    flex: 1,
    lineHeight: Units.s20,
  },
  wt: {
    width: isCalcSize(163),
    minHeight: isCalcSize(43),
    flexDirection: 'row',
  },
  cw: {
    position: 'absolute',
    bottom: Units.s12,
    paddingLeft: Units.s16,
    left: 0,
    right: 0,
    paddingRight: Units.s16,
  },
  iwp: {
    width: isCalcSize(197),
    height: isCalcSize(317),
    borderWidth: Units.s1,
    borderRadius: Units.s12,
    position: 'relative',
  },
});
