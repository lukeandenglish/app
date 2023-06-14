import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {t} from '@lingui/macro';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Inset} from 'react-native-spacing-system';
import {Queue, Stack} from '../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../styleApp/Typografy';
import {LabelText} from '../../styleApp/UI/LabelText';
import {Units} from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import {PREVIEW_DATA} from './screen';

export const FlatPreviewStick = () => {
  return (
    <FlatList
      bounces={false}
      renderItem={props => (
        <View style={styles.wrapper}>
          <Inset horizontal={Units.s8} vertical={Units.s8}>
            <View style={styles.container}>
              <View style={[styles.image]} />
              <Queue size="s10" />
              <View style={{flex: 1}}>
                <LabelText
                  title={props.item.title}
                  style={Object.assign([
                    FontFamily[500],
                    Typography.text16,
                    {color: colors.lightInk, textAlign: 'left', flex: 1},
                  ])}
                />
                <View style={{flex: 1}} />
                <LabelText
                  title={props.item.count}
                  style={Object.assign([
                    FontFamily[300],
                    Typography.text16,
                    {color: colors.lightInk, textAlign: 'left', flex: 1},
                  ])}
                />
              </View>
              <Queue size="s10" />
              <TouchableOpacity style={[Styles.iconClose, {borderWidth: 1}]} />
            </View>
          </Inset>
        </View>
      )}
      ListHeaderComponent={() => (
        <View style={{width: '100%'}}>
          <LabelText
            title={t`Начните с этих подборок`}
            style={Object.assign([
              FontFamily[400],
              Typography.text38,
              {color: colors.lightInk, textAlign: 'center', flex: 1},
            ])}
          />
          <Stack size="s10" />
          <LabelText
            title={t`Мы подобрали несколько коллекций основываясь на ваших ответах`}
            style={Object.assign([
              FontFamily[300],
              Typography.text16,
              {color: colors.lightInk, textAlign: 'center', flex: 1},
            ])}
          />
          <Stack size="s20" />
        </View>
      )}
      data={PREVIEW_DATA}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: Units.s100,
    height: Units.s100,
    borderWidth: 1,
    borderRadius: Units.s20,
  },
  wrapper: {
    flex: 1,
    borderRadius: Units.s14,
    marginVertical: Units.s4,
    backgroundColor: colors.lightPrimary,
    borderColor: colors.gray_300,
    borderWidth: 1,
  },
});
