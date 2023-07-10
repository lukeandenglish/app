import {t} from '@lingui/macro';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {playSvg} from '../../../../assets/close';
import {reverseSvg} from '../../../../assets/collection';
import {Inset, Stack} from '../../../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../../../styleApp/Typografy';
import {isCalcSize} from '../../../../styleApp/Units';
import colors from '../../../../styleApp/colors';

export const ItemSeparator = () => {
  return (
    <>
      <Stack size="s16" />
      <View style={styles.sbw} />
      <Stack size="s16" />
    </>
  );
};

export const HeaderCardRenderItem = () => {
  return (
    <View style={Styles.flex1}>
      <Text style={Typography.text24}>{t`Выберите стэк`}</Text>
      <Stack size="s24" />
    </View>
  );
};

export const SelectCardRenderItem = props => {
  return (
    <View style={styles.rwbctx}>
      <View style={styles.rbctx} />
      <Inset left="s14" right="s20" layout={StyleSheet.flatten({flex: 1})}>
        <Text style={[Typography.text18, FontFamily['600']]}>
          {props.item?.name}
        </Text>
        <Stack size="s8" />
        <Text style={[Typography.text14, FontFamily['400']]}>
          {props.item?.desc}
        </Text>
      </Inset>
      <View>
        <SvgXml
          width={isCalcSize(36)}
          height={isCalcSize(36)}
          xml={props.index === 0 ? reverseSvg : playSvg}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sbw: {borderBottomWidth: 1, borderColor: colors.gray_200},
  rwbctx: {flexDirection: 'row', alignItems: 'center', flex: 1},
  rbctx: {
    width: isCalcSize(82),
    height: isCalcSize(82),
    borderWidth: 1,
  },
});
