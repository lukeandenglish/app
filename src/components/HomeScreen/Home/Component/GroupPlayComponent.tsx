import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {listSvg, playModalSvg} from '../../../../assets/close/index';
import {card, create, profile} from '../../../../assets/svg/bottom-tabs';
import ROUTER_PAGE from '../../../../config/page';
import {Inset, Queue, Stack} from '../../../../styleApp/Spacing';
import {Styles} from '../../../../styleApp/Styles';
import {FontFamily, Typography} from '../../../../styleApp/Typografy';
import {BottomSheetCustomComponent} from '../../../../styleApp/UI/BottomSheetCustomComponent';
import {Units, isCalcSize} from '../../../../styleApp/Units';
import colors from '../../../../styleApp/colors';
import {
  HeaderCardRenderItem,
  ItemSeparator,
  SelectCardRenderItem,
} from '../BottomSheet/MyPlayList';
import Animated, {
  ZoomInUp,
  FadeOutDown,
  Layout as RNRLayout,
} from 'react-native-reanimated';

export const GroupPlayComponent = ({isEmpty}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const hancleOpenModal = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };
  const dataList = [
    {name: 'Учить всё', desc: '30 / 84 слов '},
    {name: 'Talking contemporary art', desc: '30 / 84 слов '},
    {name: 'High society vacabulary', desc: '30 / 84 слов '},
    {name: 'Talking to plumbers', desc: '30 / 84 слов '},
    {name: 'Talking english to the French ', desc: '30 / 84 слов '},
    {name: 'Talking contemporary art', desc: '30 / 84 слов '},
  ];

  const handlePageNavigate = () => {
    try {
      navigation.navigate(ROUTER_PAGE.TAB.SETTINGS);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageSearchNavigate = () => {
    try {
      navigation.navigate(ROUTER_PAGE.AUTH.PROFILE_SEARCH_CARD);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageMainNavigate = () => {
    try {
      navigation.navigate(ROUTER_PAGE.AUTH.PROFILE_MAIN);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={{height: isCalcSize(!isEmpty ? 140 : 70) + insets.bottom}} />
      <View style={styles.gpcw}>
        {!isEmpty && (
          <Animated.View
            entering={ZoomInUp}
            exiting={FadeOutDown}
            layout={RNRLayout.duration(1400).delay(1400)}>
            <Inset
              horizontal="s16"
              vertical="s12"
              layout={StyleSheet.flatten({
                flexDirection: 'row',
                alignItems: 'center',
              })}>
              <View style={styles.gpcwbl} />
              <Queue size="s16" />
              <View style={Styles.flex1}>
                <Text style={(Typography.text16, FontFamily['500'])}>
                  High society vocabulary
                </Text>
                <Stack size="s6" />
                <Text style={[Typography.text12, FontFamily['400']]}>
                  33 / 43 слов{' '}
                </Text>
                <Stack size="s6" />
              </View>
              <Queue size="s16" />
              <SvgXml xml={playModalSvg} />
              <Queue size="s16" />
              <TouchableOpacity onPress={hancleOpenModal}>
                <SvgXml xml={listSvg} />
              </TouchableOpacity>
            </Inset>
          </Animated.View>
        )}
        <View
          style={[
            styles.rowbtn,
            {
              paddingBottom: insets.bottom,
            },
          ]}>
          <Inset
            vertical="s14"
            layout={StyleSheet.flatten({
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-around',
            })}>
            <TouchableOpacity
              style={[Styles.flex1, styles.btnT]}
              onPress={handlePageSearchNavigate}>
              <SvgXml xml={card} />
              <Text
                style={[
                  styles.btntxt,
                  Typography.text12,
                  FontFamily[400],
                  {color: colors.gray_350},
                ]}>
                {t`Подборки`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.flex1, styles.btnT]}
              onPress={handlePageMainNavigate}>
              <SvgXml xml={create} />
              <Text
                style={[
                  styles.btntxt,
                  Typography.text12,
                  FontFamily[400],
                  {color: '#E2F601'},
                ]}>{t`Учить`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePageNavigate}
              style={[Styles.flex1, styles.btnT]}>
              <SvgXml xml={profile} />
              <Text
                style={[
                  styles.btntxt,
                  Typography.text12,
                  FontFamily[400],
                  {color: colors.gray_350},
                ]}>
                {t`Профиль`}
              </Text>
            </TouchableOpacity>
          </Inset>
        </View>
      </View>
      <BottomSheetCustomComponent ref={bottomSheetRef} mode="fullscreen">
        <BottomSheetFlatList
          contentContainerStyle={{
            paddingHorizontal: Units.s24,
            paddingVertical: Units.s24,
            paddingBottom: insets.bottom + Units.s100,
          }}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={HeaderCardRenderItem}
          renderItem={props => {
            return <SelectCardRenderItem {...props} />;
          }}
          data={dataList}
        />
      </BottomSheetCustomComponent>
    </>
  );
};

const styles = StyleSheet.create({
  rowbtn: {
    flexDirection: 'row',
    backgroundColor: colors.lightInk,
  },
  btntxt: {
    textAlign: 'center',
    color: colors.gray_100,
    alignItems: 'center',
  },
  btnT: {
    alignItems: 'center',
    minWidth: '30%',
  },
  gpcwbl: {
    height: isCalcSize(48),
    alignItems: 'center',
    justifyContent: 'center',
    width: isCalcSize(48),
    backgroundColor: 'red',
    borderRadius: Units.s8,
  },
  gpcw: {
    position: 'absolute',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.10)',
    backgroundColor: colors.lightPrimary,
    left: 0,
    right: 0,
    bottom: -10,
  },
});
