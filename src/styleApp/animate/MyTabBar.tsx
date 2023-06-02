import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {card, create} from '../../assets/svg/bottom-tabs';
import {Inset, Stack as InsetStack} from '../../styleApp/Spacing';
import {FontFamily, Typography} from '../../styleApp/Typografy';
import {LabelText} from '../../styleApp/UI/LabelText';
import colors from '../../styleApp/colors';

export const styles = StyleSheet.create({
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
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: insets.bottom,
            }}>
            <Inset
              vertical="s4"
              layout={StyleSheet.flatten([
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ])}>
              <View
                style={[
                  {height: 20, alignItems: 'center', justifyContent: 'center'},
                ]}>
                <View style={[index === 1 && {top: -30, position: 'absolute'}]}>
                  <SvgXml
                    xml={R.cond([
                      [R.equals(1), R.always(create)],
                      [R.T, R.always(card)],
                      [R.F, R.always(card)],
                    ])(index)}
                  />
                </View>
              </View>
              <InsetStack size="s8" />
              <LabelText
                title={R.cond([
                  [R.equals(0), R.always(t`Мои колоды`)],
                  [R.equals(2), R.always(t`Исследовать`)],
                  [R.T, R.always(t`Создать`)],
                  [R.F, R.always(t`Создать`)],
                ])(index)}
                style={Object.assign([
                  Typography.text12,
                  {textAlign: 'center'},
                  FontFamily[400],
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
