import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Queue} from '../../styleApp/Spacing';
import {Units, isCalcSize} from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import {LabelText} from '../../styleApp/UI/LabelText';
import {FontFamily, Typography} from '../../styleApp/Typografy';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as R from 'ramda';

export const SelectInput = ({onSubmit, state, setState}) => {
  const ref = React.useRef(null);

  return (
    <View style={styles.cont}>
      <TextInput
        ref={ref}
        autoFocus
        onChangeText={setState}
        keyboardType="numeric"
        onSubmitEditing={() => onSubmit(state)}
        onBlur={() => onSubmit(state)}
        value={state}
        blurOnSubmit
        style={styles.textDisplay}
      />
      <View onTouchStart={ref?.current?.focus} style={styles.wb}>
        <TouchableOpacity
          onPress={() => {
            ref?.current?.focus();
            setState('');
          }}
          style={[styles.qwe, R.hasPath([0])(state) && styles.focustext]}>
          <LabelText
            mode="desc"
            title={R.path([0])(state)}
            style={Object.assign([
              {color: colors.lightInk, textAlign: 'center'},
              Typography.text30,
              FontFamily.wermut,
            ])}
          />
        </TouchableOpacity>
        <Queue size="s16" />
        <TouchableOpacity
          onPress={() => {
            ref?.current?.focus();
            setState(R.take(1, state));
          }}
          style={[styles.qwe, R.hasPath([1])(state) && styles.focustext]}>
          <LabelText
            mode="desc"
            title={R.path([1])(state)}
            style={Object.assign([
              {color: colors.lightInk, textAlign: 'center'},
              Typography.text30,
              FontFamily.wermut,
            ])}
          />
        </TouchableOpacity>
        <Queue size="s16" />
        <TouchableOpacity
          onPress={() => {
            ref?.current?.focus();
            setState(R.take(2, state));
          }}
          style={[styles.qwe, R.hasPath([2])(state) && styles.focustext]}>
          <LabelText
            mode="desc"
            title={R.path([2])(state)}
            style={Object.assign([
              {color: colors.lightInk, textAlign: 'center'},
              Typography.text30,
              FontFamily.wermut,
            ])}
          />
        </TouchableOpacity>
        <Queue size="s16" />

        <TouchableOpacity
          onPress={() => {
            ref?.current?.focus();
            setState(R.take(3, state));
          }}
          style={[styles.qwe, R.hasPath([3])(state) && styles.focustext]}>
          <LabelText
            mode="desc"
            title={R.path([3])(state)}
            style={Object.assign([
              {color: colors.lightInk, textAlign: 'center'},
              Typography.text30,
              FontFamily.wermut,
            ])}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {position: 'relative'},
  textDisplay: {height: 0, display: 'none'},
  focustext: {
    backgroundColor: colors.lightPrimary,
  },
  wb: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  qwe: {
    width: isCalcSize(48),
    height: isCalcSize(64),
    borderWidth: 2,
    borderRadius: Units.s8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
