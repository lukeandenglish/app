import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {iconread} from '../../assets/close';
import {Typography} from '../../styleApp/Typografy';
import {Units} from '../../styleApp/Units';
import colors from '../../styleApp/colors';

export const TextAddedComp = ({title}: {title: string}) => {
  return (
    <View style={styles.lineWidth}>
      <View style={styles.styleabsolute}>
        <Text style={[styles.textStyle, Typography.text22]}>{title}</Text>
        <SvgXml style={styles.iconRead} xml={iconread} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'GraphikLCG-Bold',
    fontWeight: 'bold',
  },
  iconRead: {
    position: 'absolute',
    bottom: -Units.s32 + Units.s1,
    left: -Units.s14,
  },
  lineWidth: {position: 'relative', width: '100%'},
  styleabsolute: {
    borderWidth: Units.s4,
    borderBottomWidth: Units.s8,
    borderRightWidth: Units.s8,
    position: 'absolute',
    borderRadius: Units.s20,
    backgroundColor: colors.lemon,
    width: 300,
    left: 50,
    right: 50,
    padding: Units.s14,
  },
});
