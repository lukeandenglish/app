import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {Portal} from '@gorhom/portal';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {
  addedSvg,
  closeNavigateSvg,
  copySvg,
  moreSvg,
} from '../../../../assets/close';
import {Inset, Queue, Stack} from '../../../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../../../styleApp/Typografy';
import {BottomSheetCustomComponent} from '../../../../styleApp/UI/BottomSheetCustomComponent';
import {Button} from '../../../../styleApp/UI/Button';
import {Units, isCalcSize} from '../../../../styleApp/Units';
import colors, {cardColor} from '../../../../styleApp/colors';
import {CreateCard} from '../../../../modal/CreateCard';

export const MyImage = props => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const ref = React.useRef<BottomSheet | null>(null);

  return (
    <View style={Styles.flex1}>
      <View
        style={[
          styles.imc,
          {
            paddingTop: insets.top,
          },
        ]}>
        <Image
          source={props.image}
          style={{width: isCalcSize(292), height: isCalcSize(307)}}
        />
        <View
          style={[
            styles.lab,
            {
              top: insets.top,
            },
          ]}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={Styles.iconClose}>
            <SvgXml
              xml={closeNavigateSvg}
              width={isCalcSize(24)}
              height={isCalcSize(24)}
            />
          </TouchableOpacity>
        </View>
        {!props.isAdmin && (
          <View
            style={[
              styles.rab,
              {
                top: insets.top,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                ref.current?.snapToIndex(1);
              }}
              style={Styles.iconClose}>
              <SvgXml
                xml={moreSvg}
                width={isCalcSize(24)}
                height={isCalcSize(24)}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Stack size="s24" />
      <Inset horizontal="s24">
        <View style={Styles.flex1}>
          <Text style={[Typography.text38, FontFamily.wermut]}>
            {props.title}
          </Text>
        </View>
        <Stack size="s18" />
        <View style={Styles.flex1}>
          <Text style={[Typography.text12, FontFamily['400']]}>
            {props.author}
          </Text>
        </View>
        <Stack size="s18" />
        {props.isAdmin ? (
          <View style={styles.fr}>
            <Button
              title={'В закладки'}
              onPress={props.onAddedFavour}
              styleText={Typography.text14}
              style={styles.ibt}>
              <SvgXml xml={addedSvg} />
            </Button>
            <Queue size="s12" />
            <Button
              title="Скопировать"
              onPress={props.onCopy}
              styleText={Typography.text14}
              style={styles.ibt}>
              <SvgXml xml={copySvg} />
            </Button>
          </View>
        ) : (
          <View />
        )}
      </Inset>
      <Stack size="s18" />
      <Inset horizontal="s24">
        <View style={styles.bbw} />
      </Inset>
      <Portal name="UpdateCardWord">
        <BottomSheetCustomComponent ref={ref} mode="fullscreenWithout">
          <CreateCard onClose={() => ref.current?.close()} />
        </BottomSheetCustomComponent>
      </Portal>
    </View>
  );
};

export const styles = StyleSheet.create({
  rab: {position: 'absolute', right: 14},
  lab: {position: 'absolute', left: 14},
  imc: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bbw: {borderBottomWidth: 1},
  fr: {flexDirection: 'row'},
  ibt: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: Units.s8,
  },
  btw: {borderBottomWidth: 1},
  tapBlc: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cardColor.Faded_Grass,
  },
  ew: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  etw: {width: isCalcSize(240)},
  ett: {
    textAlign: 'center',
    color: colors.lightInk,
    lineHeight: Units.s22,
  },
  etb: {
    backgroundColor: colors.lightPrimary,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
  },
  wtd2: {fontWeight: '400'},
  wtd1: {fontWeight: '600'},
  wtd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wtt: {
    fontWeight: '600',
    flex: 1,
    lineHeight: Units.s20,
  },
  wt: {
    width: isCalcSize(163),
    minHeight: isCalcSize(43),
    flexDirection: 'row',
  },
  cw: {
    position: 'absolute',
    bottom: Units.s12,
    paddingLeft: Units.s16,
    left: 0,
    right: 0,
    paddingRight: Units.s16,
  },
  iwp: {
    width: isCalcSize(197),
    height: isCalcSize(317),
    borderWidth: Units.s1,
    borderRadius: Units.s12,
    position: 'relative',
  },
});
