import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Units, isCalcSize} from '../../../styleApp/Units/index';
import {defaultSvg, mainSvg} from '../../../assets/close';
import {SvgXml} from 'react-native-svg';
import {Button} from '../../../styleApp/UI/Button';
import {Typography} from '../../../styleApp/Typografy';
import {t} from '@lingui/macro';

export const WLC_Component: () => React.JSX.Element = () => {
  return (
    <View style={styles.wlcw}>
      <SvgXml xml={mainSvg} />
      <View style={styles.wlcb}>
        <Button
          title={t`Учить`}
          style={styles.wlcbs}
          styleText={Object.assign([styles.wlcst, Typography.text18])}>
          <SvgXml xml={defaultSvg} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wlcst: {
    flex: 1,
    textAlign: 'center',
    paddingRight: Units.s30,
    fontWeight: '700',
    color: '#E2F601',
  },
  wlcbs: {
    backgroundColor: '#000000',
    height: 60,
    borderRadius: Units.s10,
  },
  wlcb: {
    position: 'absolute',
    zIndex: 100,
    left: 20,
    right: 20,
    bottom: 20,
  },
  wlcw: {
    height: isCalcSize(480),
    width: '100%',
    backgroundColor: 'red',
    position: 'relative',
  },
});
