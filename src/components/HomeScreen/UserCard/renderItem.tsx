import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {Portal} from '@gorhom/portal';
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {addedSvg, playSoundSvg, startLearnSvg} from '../../../assets/close';
import {reverseSvg} from '../../../assets/collection';
import SECTION from '../../../config/section';
import {isCheck} from '../../../hooks/usePlaySound';
import {Inset, Queue, Stack} from '../../../styleApp/Spacing';
import {FontFamily, Typography} from '../../../styleApp/Typografy';
import {BottomSheetCustomComponent} from '../../../styleApp/UI/BottomSheetCustomComponent';
import {Button} from '../../../styleApp/UI/Button';
import {Units} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';
import {MyImage} from './Section/MyImage';
import {Result} from './Section/Result';

const SelectionCode = props => {
  const ref = React.useRef<BottomSheet | null>(null);
  return (
    <>
      <Inset horizontal="s24">
        <Text style={Typography.text14}>{props.description}</Text>
        <Stack size="s20" />
        <Text style={Typography.text30}>
          {[t`Слова`, ' (', props.count, ')'].join('')}
        </Text>
        <Stack size="s20" />
        {props.data.map((x, el) => {
          if (!R.path(['card'])(x)) {
            return (
              <Button
                key={['key', el].join('_')}
                title="Добавить слово"
                onPress={() => ref.current?.snapToIndex(1)}
                style={styles.iwbtn}
                styleText={Object.assign([
                  {flex: 1},
                  Typography.text16,
                  FontFamily['600'],
                ])}>
                <SvgXml xml={addedSvg} />
              </Button>
            );
          }
          return (
            <Inset
              key={['key', el].join('_')}
              horizontal="s16"
              vertical="s16"
              layout={StyleSheet.flatten(styles.iwp)}>
              <View style={styles.iwr}>
                <View style={styles.iwc}>
                  <Text style={[Typography.text18, FontFamily['600']]}>
                    {x.title}
                  </Text>
                  <Stack size="s4" />
                  <Text style={[Typography.text14, FontFamily['400']]}>
                    {x.translate}
                  </Text>
                </View>
                <Queue size="s24" />
                <View style={styles.cntr}>
                  <TouchableOpacity onPress={x.handlePlayMusic(x.key, x.title)}>
                    <SvgXml
                      xml={
                        isCheck(x.key, x.play, x.title)
                          ? reverseSvg
                          : playSoundSvg
                      }
                    />
                  </TouchableOpacity>
                </View>
                <Queue size="s24" />
                <View style={styles.cntr}>
                  <TouchableOpacity onPress={x.onPressAdd}>
                    <SvgXml xml={addedSvg} />
                  </TouchableOpacity>
                </View>
              </View>
            </Inset>
          );
        })}
        <Stack size="s36" />
        <Button
          title="Учить"
          style={styles.iwba}
          styleText={Object.assign([
            styles.iwbat,
            Typography.text16,
            FontFamily['600'],
          ])}>
          <SvgXml xml={startLearnSvg} />
        </Button>
      </Inset>
      <Portal name="AddedNewWord">
        <BottomSheetCustomComponent ref={ref} mode="fullscreenWithout">
          <View />
        </BottomSheetCustomComponent>
      </Portal>
    </>
  );
};

export const renderItem = (render: any) => {
  switch (R.path(['section', 'title'])(render)) {
    case SECTION.CARD.MY_IMAGE:
      return <MyImage {...render.item} />;
    case SECTION.CARD.MY_RESULT:
      return <Result {...render.item} />;
    case SECTION.CARD.MY_COLLECTION:
      return <SelectionCode {...render.item} />;
    default:
      return <View />;
  }
};

const styles = StyleSheet.create({
  iwbat: {
    flex: 1,
    textAlign: 'center',
    paddingRight: Units.s30,
    color: colors.lemon,
  },
  iwba: {
    backgroundColor: colors.lightInk,
    paddingVertical: Units.s12,
    height: Units.s64,
  },
  iwbtn: {
    backgroundColor: colors.lightPrimary,
    height: Units.s64 + Units.s8,
    width: '100%',
    borderRadius: Units.s16,
    marginVertical: Units.s2,
  },
  iwc: {flex: 1},
  iwr: {flex: 1, flexDirection: 'row', width: '100%'},
  iwp: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.lightPrimary,
    borderRadius: Units.s16,
    marginVertical: Units.s2,
  },
  cntr: {justifyContent: 'center', alignItems: 'center'},
});
