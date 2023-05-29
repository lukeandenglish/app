import {t} from '@lingui/macro';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {apperance, lang, reminder} from '../../../assets/svg/apperance';
import next from '../../../assets/svg/next';
import {BlockHeader} from '../../../block/profile/BlockHeader';
import {Inset, Queue} from '../../../styleApp/Spacing';
import {LabelText} from '../../../styleApp/UI/LabelText';
import colors from '../../../styleApp/colors';
import {useNavigation} from '@react-navigation/native';
import ROUTER_PATH from '../../../config/page';

export default () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const MAINER = [
    {
      title: t`Внешний вид`,
      value: null,
      onPress: () => navigation.navigate(ROUTER_PATH.AUTH.PROFILE_APPERANCE),
      svg: apperance,
    },
    {title: t`Language`, value: null, onPress: () => null, svg: lang},
    {
      title: t`Reminders`,
      value: t`Enable notifications to receive reminders to study cards`,
      svg: reminder,
      onPress: () => null,
      noBottom: true,
    },
  ];
  const SECONDARY = [
    {
      title: t`Appearance`,
      value: null,
      onPress: () => navigation.navigate(ROUTER_PATH.AUTH.PROFILE_APPERANCE),
      svg: apperance,
    },
    {
      title: t`Language`,
      value: null,
      onPress: () => null,
      noBottom: true,
      svg: lang,
    },
  ];

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={[
        styles.scrolView,
        {
          paddingBottom: insets.bottom,
          backgroundColor: colors.lightPrimary,
        },
      ]}>
      <BlockHeader small={true} />
      <Inset horizontal="s16" top="s24">
        <Inset vertical="s16" layout={StyleSheet.flatten({flex: 1})}>
          <LabelText title={t`Основные`} mode="title" />
        </Inset>
        {MAINER.map((item, index) => (
          <View key={[index, 'first'].join('_')}>
            <Inset
              vertical="s16"
              layout={StyleSheet.flatten([
                styles.itemBlock,
                item.noBottom && {borderBottomWidth: 0},
              ])}>
              <View style={styles.row}>
                <SvgXml xml={item.svg} />
                <Queue size="s8" />
                <View style={{flex: 1}}>
                  <LabelText mode="desc" title={item.title} />
                  {item.value && <LabelText mode="notify" title={item.value} />}
                </View>
              </View>
              <TouchableOpacity
                onPress={item.onPress}
                style={styles.borderIcon}>
                <SvgXml xml={next} />
              </TouchableOpacity>
            </Inset>
          </View>
        ))}
      </Inset>
      <Inset horizontal="s16" top="s24">
        <Inset vertical="s16" layout={StyleSheet.flatten({flex: 1})}>
          <LabelText title={t`Additional`} mode="title" />
        </Inset>
        {SECONDARY.map((item, index) => (
          <View key={[index, 'first'].join('_')} onPress={item.onPress}>
            <Inset
              vertical="s16"
              layout={StyleSheet.flatten([
                styles.itemBlock,
                item.noBottom && {borderBottomWidth: 0},
              ])}>
              <View style={styles.row}>
                <SvgXml xml={item.svg} />
                <Queue size="s8" />
                <View style={{flex: 1}}>
                  <LabelText mode="desc" title={item.title} />
                  {item.value && <LabelText mode="notify" title={item.value} />}
                </View>
              </View>
              <TouchableOpacity
                onPress={item.onPress}
                style={styles.borderIcon}>
                <SvgXml xml={next} />
              </TouchableOpacity>
            </Inset>
          </View>
        ))}
      </Inset>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  borderIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  itemBlock: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  scrolView: {
    flexGrow: 1,
    backgroundColor: colors.transparent,
  },
});
