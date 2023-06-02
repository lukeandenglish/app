import React from 'react';
import {StatusBar, View, StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../../styleApp/colors';

export const Container = props => {
  const insets = useSafeAreaInsets();

  let background = {backgroundColor: colors.lightPrimary} as ViewStyle;
  if (props.background) {
    background = {backgroundColor: props.background};
  }
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
        },
        styles.container,
        background,
      ]}>
      <StatusBar
        animated={true}
        backgroundColor={colors.lightPrimary}
        barStyle={'dark-content'}
        showHideTransition={'slide'}
        hidden={false}
      />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPrimary,
  },
});
