import lodash from 'lodash';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PalletColor} from '../../../../assets/info/index';
import {Inset} from '../../../../styleApp/Spacing';
import {FontFamily, Typography} from '../../../../styleApp/Typografy';
import {LabelText} from '../../../../styleApp/UI/LabelText';
import {RV} from '../../../../styleApp/Utils';
import colors from '../../../../styleApp/colors';

export default () => {
  return (
    <Inset
      horizontal="s6"
      vertical="s24"
      layout={StyleSheet.flatten(styles.padding)}>
      <View
        style={[
          styles.card,
          {
            backgroundColor:
              PalletColor[lodash.random(0, PalletColor.length - 1)],
          },
        ]}>
        <Inset
          horizontal="s16"
          vertical="s22"
          layout={StyleSheet.flatten([
            styles.row,
            {justifyContent: 'space-between'},
          ])}>
          <LabelText
            title={'4000 важнейших английских слов'}
            style={Object.assign([
              Typography.text24,
              {color: colors.lightInk, textAlign: 'left'},
              FontFamily.wermut,
            ])}
          />
          <LabelText
            title={'3 456 words'}
            style={Object.assign([
              Typography.text16,
              {textAlign: 'left'},
              FontFamily[400],
              {color: colors.bodySecondary},
            ])}
          />
        </Inset>
      </View>
    </Inset>
  );
};

const styles = StyleSheet.create({
  row: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  padding: {
    height: RV(344),
    width: 200,
    position: 'relative',
    backgroundColor: colors.lightPrimary,
  },
  button: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  block: {width: '60%', position: 'relative'},
  card: {
    justifyContent: 'space-between',
    flex: 1,
    borderRadius: RV(20),
  },
});
