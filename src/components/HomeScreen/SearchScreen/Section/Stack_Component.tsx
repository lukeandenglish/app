/* eslint-disable react-native/no-inline-styles */
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {addedSvg, plusSvg} from '../../../../assets/close';
import {ArtSvg} from '../../../../assets/collection';
import {iPlayState} from '../../../../hooks/usePlaySound';
import {Layout} from '../../../../styleApp/Layout';
import {Inset, Stack} from '../../../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../../../styleApp/Typografy';
import {Button} from '../../../../styleApp/UI/Button';
import {Units, isCalcSize} from '../../../../styleApp/Units';
import colors from '../../../../styleApp/colors';
import {HeaderStack, iHeaderStack} from '../Component/HeaderStack';

export const debug = false;

export const Stack_Component: ({
  onPressAdd,
  title,
  handlePlayMusic,
  play,
  data,
  emptyIcon,
}) => React.JSX.Element = ({onPressAdd, title, data}: iStackComponent) => {
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
      <HeaderStack
        title={t`Люк подобрал`}
        onPress={onPressAdd}
        emptyIcon={false}
      />
      <Inset
        horizontal="s16"
        layout={StyleSheet.flatten({
          flexDirection: 'row',
          width: '100%',
          flexShrink: 1,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        })}>
        {data?.map((item, index) => {
          const customWidth = Layout.window.width - Units.s20 * 2;
          const dasdas =
            index % 5
              ? {
                  svg: [135, 131],
                  window: [170, 247],
                  padding: {symbol: 's12', small: 's6'},
                  width: (customWidth - Units.s8) / 2,
                }
              : {
                  svg: [256, 252],
                  window: [350, 373],
                  padding: {symbol: 's24', small: 's12'},
                  width: customWidth,
                };

          return (
            <View
              key={[index, 'search'].join('')}
              style={[
                styles.iwp,
                {
                  backgroundColor: item.background,
                  borderColor: item.background,
                  padding: R.path([dasdas.padding.symbol])(Units),
                  width: isCalcSize(dasdas.window[0]),
                  height: isCalcSize(dasdas.window[1]),
                  marginBottom: Units.s8,
                  position: 'relative',
                },
              ]}>
              <View
                style={{
                  width: isCalcSize(dasdas.svg[0]),
                  height: isCalcSize(dasdas.svg[1]),
                }}>
                <SvgXml
                  xml={ArtSvg}
                  width={isCalcSize(dasdas.svg[0])}
                  height={isCalcSize(dasdas.svg[1])}
                />
              </View>
              <View
                style={[
                  styles.cw,
                  {
                    backgroundColor: item.background,
                    bottom: R.path([dasdas.padding.symbol])(Units) / 2,
                    paddingLeft: R.path([dasdas.padding.symbol])(Units),
                    paddingRight: R.path([dasdas.padding.symbol])(Units),
                    right: 0,
                    width: isCalcSize(dasdas.window[0]),
                  },
                ]}>
                <Stack size="s2" />
                <View style={styles.wt}>
                  <Text style={[Typography.text16, FontFamily[500]]}>
                    {item.name}
                  </Text>
                </View>
                <Stack size={dasdas.padding.small} />
                <View
                  style={[
                    styles.wtd,
                    {
                      width:
                        isCalcSize(dasdas.window[0]) -
                        2 * R.path([dasdas.padding.symbol])(Units),
                    },
                  ]}>
                  <Text
                    style={[
                      styles.wtd1,
                      Typography.text12,
                      FontFamily[400],
                      {alignItems: 'flex-end'},
                    ]}>
                    {[item?.countLearn, 'слова'].join(' ')}
                  </Text>
                  <View style={{position: 'absolute', right: 0}}>
                    <SvgXml xml={addedSvg} />
                  </View>
                </View>
                <Stack _debug={debug} size="s12" />
              </View>
            </View>
          );
        })}
      </Inset>
    </View>
  );
};

export interface iData {
  name: string;
  countLearn: number;
  count: number;
  background: string;
  onPressMusic: () => void;
}

export interface iStackComponent extends iHeaderStack {
  data?: iData[];
  play: iPlayState;
  onPressAdd: () => void;
}

const styles = StyleSheet.create({
  ew: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  etw: {width: isCalcSize(240)},
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
    alignItems: 'center',
  },
  wt: {
    flexDirection: 'row',
  },
  cw: {
    position: 'absolute',
  },
  iwp: {
    width: Layout.window.width - Units.s12 * 2,
    height: isCalcSize(317),
    borderWidth: Units.s1,
    borderRadius: Units.s12,
    position: 'relative',
  },
});
