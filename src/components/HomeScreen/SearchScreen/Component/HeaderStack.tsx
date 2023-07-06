import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Inset} from '../../../../styleApp/Spacing';
import {FontFamily, Typography} from '../../../../styleApp/Typografy';
import {isCalcSize} from '../../../../styleApp/Units';

const debug = false;

export const HeaderStack = ({title}) => {
  return (
    <Inset
      _debug={debug}
      horizontal="s20"
      bottom="s12"
      top="s36"
      layout={StyleSheet.flatten(styles.hiw)}>
      <Text style={[Typography.text38, styles.hit, FontFamily.wermut]}>
        {title}
      </Text>
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
