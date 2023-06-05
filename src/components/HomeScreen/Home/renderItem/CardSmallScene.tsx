import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Inset, Stack} from '../../../../styleApp/Spacing';
import {RV} from '../../../../styleApp/Utils';
import {PalletColor} from '../../../../assets/info/index';
import {LabelText} from '../../../../styleApp/UI/LabelText';
import {FontFamily, Typography} from '../../../../styleApp/Typografy';
import colors from '../../../../styleApp/colors';
import {SvgXml} from 'react-native-svg';
import {two} from '../../../../assets/info';
import lodash from 'lodash';
import {iListItem} from '../../../../redux/api/deckCard/helper';
// import {WIDTH} from '../screen';

export default ({cardLength, title}: iListItem) => {
  return (
    <Inset
      horizontal="s6"
      vertical="s24"
      layout={StyleSheet.flatten(styles.padding)}>
      <>
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
            vertical="s16"
            layout={StyleSheet.flatten(styles.row)}>
            <SvgXml xml={two} width={140} height={140} />
          </Inset>
        </View>
        <Inset horizontal="s16" vertical="s16">
          <LabelText
            title={title}
            style={Object.assign([
              Typography.text16,
              {color: colors.lightInk, textAlign: 'left'},
              FontFamily['600'],
            ])}
          />
          <Stack size="s8" />
          <LabelText
            title={[cardLength, 'words'].join(' ')}
            style={Object.assign([
              Typography.text16,
              {textAlign: 'left'},
              FontFamily[400],
              {color: colors.bodySecondary},
            ])}
          />
        </Inset>
      </>
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