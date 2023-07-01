import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {isCalcSize, Units} from '../../../../styleApp/Units';
import colors from '../../../../styleApp/colors';
import {Inset, Queue, Stack} from '../../../../styleApp/Spacing';
import {Styles} from '../../../../styleApp/Styles';
import {listSvg, playModalSvg} from '../../../../assets/close/index';
import {FontFamily} from '../../../../styleApp/Typografy';

export const GroupPlayComponent = () => {
  return (
    <View style={styles.gpcw}>
      <Inset
        horizontal="s16"
        vertical="s12"
        layout={StyleSheet.flatten({
          flexDirection: 'row',
          alignItems: 'center',
        })}>
        <View style={styles.gpcwbl} />
        <Queue size="s16" />
        <View style={Styles.flex1}>
          <Text style={FontFamily['500']}>High society vocabulary</Text>
          <Stack size="s6" />
          <Text style={FontFamily['400']}>33 / 43 слов </Text>
          <Stack size="s6" />
        </View>
        <Queue size="s16" />
        <SvgXml xml={playModalSvg} />
        <Queue size="s16" />
        <SvgXml xml={listSvg} />
      </Inset>
    </View>
  );
};

const styles = StyleSheet.create({
  gpcwbl: {
    height: isCalcSize(48),
    alignItems: 'center',
    justifyContent: 'center',
    width: isCalcSize(48),
    backgroundColor: 'red',
    borderRadius: Units.s8,
  },
  gpcw: {
    position: 'absolute',
    height: isCalcSize(72),
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.10)',
    backgroundColor: colors.lightPrimary,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
