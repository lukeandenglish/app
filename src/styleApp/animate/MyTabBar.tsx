/* eslint-disable react-native/no-inline-styles */
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {card, create, profile} from '../../assets/svg/bottom-tabs';
import {Inset} from '../../styleApp/Spacing';
import {FontFamily, Typography} from '../../styleApp/Typografy';
import {LabelText} from '../../styleApp/UI/LabelText';
import colors from '../../styleApp/colors';
import {Units} from '../Units';

export const styles = StyleSheet.create({
  twr: {alignItems: 'center', justifyContent: 'center'},
  twp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightInk,
  },
  blockTab: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: colors.gray_100,
  },
});

export function MyTabBar({state, descriptors, navigation}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.blockTab]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={['tab_bar', route.key, index].join('_')}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.twp,
              {
                paddingBottom: insets.bottom - Units.s20,
              },
            ]}>
            <Inset top="s4" layout={StyleSheet.flatten(styles.twr)}>
              <View style={styles.twr}>
                <SvgXml
                  xml={R.cond([
                    [R.equals(1), R.always(create)],
                    [R.equals(0), R.always(card)],
                    [R.T, R.always(profile)],
                    [R.F, R.always(profile)],
                  ])(index)}
                />
              </View>
              <LabelText
                title={R.cond([
                  [R.equals(0), R.always(t`Подборки`)],
                  [R.equals(2), R.always(t`Профиль`)],
                  [R.T, R.always(t`Учить`)],
                  [R.F, R.always(t`Учить`)],
                ])(index)}
                style={Object.assign([
                  Typography.text12,
                  FontFamily[400],
                  styles.twr,
                  {color: colors.bodySecondary},
                ])}
              />
            </Inset>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
