import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {plusSvg} from '../../../../assets/close';
import {FontFamily, Typography} from '../../../../styleApp/Typografy';
import {isCalcSize} from '../../../../styleApp/Units';
import {Inset} from '../../../../styleApp/Spacing';

const debug = false;

export const HeaderStack = ({title, onPress, emptyIcon}) => {
  return (
    <Inset
      _debug={debug}
      horizontal="s20"
      bottom="s12"
      top="s36"
      layout={StyleSheet.flatten(styles.hiw)}>
      <Text style={[Typography.text24, styles.hit, FontFamily.wermut]}>
        {title}
      </Text>
      {emptyIcon && (
        <TouchableOpacity onPress={onPress}>
          <SvgXml
            xml={plusSvg}
            width={isCalcSize(24)}
            height={isCalcSize(24)}
          />
        </TouchableOpacity>
      )}
    </Inset>
  );
};

export interface iHeaderStack {
  title?: string;
  onPress?: () => void;
  emptyIcon?: boolean;
}

const styles = StyleSheet.create({
  hit: {alignItems: 'center', flex: 1, textAlign: 'left'},
  hiw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: isCalcSize(60),
  },
});
