import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../../../styleApp/UI/Button';
import {Inset, Stack} from '../../../../styleApp/Spacing';
import {RV} from '../../../../styleApp/Utils';
import {PalletColor} from '../../../../assets/info/index';
import {LabelText} from '../../../../styleApp/UI/LabelText';
import {FontFamily, Typography} from '../../../../styleApp/Typografy';
import colors from '../../../../styleApp/colors';
import {SvgXml} from 'react-native-svg';
import {two} from '../../../../assets/info';
import {t} from '@lingui/macro';
import lodash from 'lodash';
import {WIDTH} from '../screen';

export default () => {
  return (
    <Inset
      horizontal="s16"
      vertical="s24"
      layout={StyleSheet.flatten({
        height: RV(264),
        width: WIDTH,
        position: 'relative',
        backgroundColor: colors.lightPrimary,
      })}>
      <View
        style={[
          styles.insets,
          {
            backgroundColor:
              PalletColor[lodash.random(0, PalletColor.length - 1)],
          },
        ]}>
        <Inset
          horizontal="s16"
          top="s16"
          layout={StyleSheet.flatten(styles.rowBlock)}>
          <View style={styles.content}>
            <LabelText
              title={'Most important English phrases'}
              style={Object.assign([
                Typography.text16,
                {color: colors.lightInk},
                FontFamily['600'],
              ])}
            />
            <Stack size="s8" />
            <LabelText
              title={'3 456 words'}
              style={Object.assign([
                Typography.text12,
                {textAlign: 'left'},
                FontFamily[400],
                {color: colors.lightInk},
              ])}
            />
          </View>
          <View style={styles.btn}>
            <SvgXml xml={two} width={130} height={130} />
          </View>
        </Inset>
        <Inset horizontal="s16" vertical="s16">
          <Button
            title={t`Продолжить учить колоду`}
            styleText={{color: colors.lightInk}}
            style={{backgroundColor: colors.lightPrimary}}
          />
        </Inset>
      </View>
    </Inset>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rowBlock: {flex: 1, flexDirection: 'row'},
  content: {width: '60%', position: 'relative'},
  insets: {
    width: '100%',
    height: '100%',
    borderRadius: RV(20),
  },
});
