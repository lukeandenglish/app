/* eslint-disable react-native/no-inline-styles */
import {t} from '@lingui/macro';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {closeSvg, playVideoSvg, plusSvg} from '../../../assets/close';
import {ArtSvg} from '../../../assets/collection';
import {iPlayState, isCheck} from '../../../hooks/usePlaySound';
import {Inset, Queue, Stack} from '../../../styleApp/Spacing';
import {Styles, Typography} from '../../../styleApp/Typografy';
import {Button} from '../../../styleApp/UI/Button';
import {Units, isCalcSize} from '../../../styleApp/Units/index';
import colors from '../../../styleApp/colors';
import {HeaderStack, iHeaderStack} from './HeaderStack';

export const debug = false;

export const Stack_Video_Component: ({
  onPressAdd,
  title,
  handlePlayMusic,
  play,
  data,
  emptyIcon,
}) => React.JSX.Element = ({
  onPressAdd,
  title,
  handlePlayMusic,
  play,
  data,
  emptyIcon,
}) => {
  if (R.isEmpty(data)) {
    return (
      <View style={Styles.flex1}>
        <HeaderStack title={title} onPress={onPressAdd} emptyIcon={true} />
        <Inset
          _debug={debug}
          vertical="s16"
          horizontal="s16"
          layout={StyleSheet.flatten(styles.ew)}>
          <SvgXml
            xml={ArtSvg}
            height={isCalcSize(189)}
            width={isCalcSize(169)}
          />
          <Stack _debug={debug} size="s16" />
          <View style={styles.etw}>
            <Text style={styles.ett}>
              {t`Создайте свой первый стэк и добавьте слова`}
            </Text>
          </View>

          <Stack _debug={debug} size="s18" />
          <Button title="Новый стэк" style={styles.etb} onPress={onPressAdd}>
            <SvgXml
              xml={plusSvg}
              width={isCalcSize(24)}
              height={isCalcSize(24)}
            />
          </Button>
        </Inset>
      </View>
    );
  }

  return (
    <View style={[Styles.flex1]}>
      <HeaderStack title={title} onPress={onPressAdd} emptyIcon={emptyIcon} />
      <FlashList
        horizontal
        contentContainerStyle={{
          paddingHorizontal: Units.s12,
        }}
        data={data}
        ItemSeparatorComponent={() => <Queue size="s8" />}
        showsHorizontalScrollIndicator={false}
        renderItem={(props: ListRenderItemInfo<iData>) => (
          <View
            style={[
              styles.iwp,
              {
                height: isCalcSize(317),
                backgroundColor: props.item.background,
                borderColor: props.item.background,
              },
            ]}>
            <Inset
              _debug={debug}
              vertical="s6"
              layout={StyleSheet.flatten(Styles.flex1)}>
              <View />
            </Inset>
            <View style={styles.cw}>
              <TouchableOpacity
                onPress={() => handlePlayMusic(props.index, props.item.name)()}>
                <SvgXml
                  xml={
                    isCheck(props.index, play, props.item.name)
                      ? closeSvg
                      : playVideoSvg
                  }
                />
                <Stack _debug={debug} size="s12" />
                <View style={styles.wt}>
                  <Text style={[Typography.text18, styles.wtt]}>
                    {props.item.name}
                  </Text>
                </View>
                <Stack _debug={debug} size="s10" />
                <Text style={[Typography.text12, styles.wtt]}>
                  {props.item.data}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export interface iData {
  name: string;
  data: string;
  background: string;
  onPressAdd: () => void;
  onPressMusic: () => void;
}

export interface iStackComponent extends iHeaderStack {
  data: iData[];
  handlePlayMusic?: (e: number, table: string) => () => void;
  play: iPlayState;
}

const styles = StyleSheet.create({
  ew: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  etw: {width: 240},
  ett: {
    textAlign: 'center',
    color: colors.lightInk,
    lineHeight: Units.s22,
  },
  etb: {
    backgroundColor: colors.lightPrimary,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
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
    color: '#FBFFD0',
  },
  wt: {
    width: isCalcSize(163),
    minHeight: isCalcSize(43),
    flexDirection: 'row',
  },
  cw: {
    position: 'absolute',
    bottom: Units.s12,
    left: Units.s16,
    right: Units.s16,
  },
  iwp: {
    width: isCalcSize(197),
    height: isCalcSize(317),
    borderWidth: Units.s1,
    borderRadius: Units.s12,
    position: 'relative',
  },
});
