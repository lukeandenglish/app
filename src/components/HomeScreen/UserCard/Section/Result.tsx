import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Queue, Stack, Inset} from '../../../../styleApp/Spacing';
import {FontFamily, Typography} from '../../../../styleApp/Typografy';
import {Text} from 'react-native';
import {isCalcSize} from '../../../../styleApp/Units';

export const Result = props => {
  return (
    <Inset horizontal="s24" top="s14">
      <View style={styles.fr}>
        <View style={styles.iwc}>
          <Text style={[Typography.text30, FontFamily.wermut]}>
            {props.learn.count}
          </Text>
          <Stack size="s8" />
          <Text style={[Typography.text12, FontFamily['400']]}>
            {props.learn.title}
          </Text>
        </View>
        <Queue size="s18" />
        <View style={styles.iwc}>
          <Text style={[Typography.text30, FontFamily.wermut]}>
            {props.summary.count}
          </Text>
          <Stack size="s8" />
          <Text style={[Typography.text12, FontFamily['400']]}>
            {props.summary.title}
          </Text>
        </View>
      </View>
      <Inset vertical="s18">
        <View style={styles.bbw} />
      </Inset>
    </Inset>
  );
};

const styles = StyleSheet.create({
  iwc: {width: isCalcSize(162)},
  fr: {flexDirection: 'row'},
  bbw: {borderBottomWidth: 1},
});
