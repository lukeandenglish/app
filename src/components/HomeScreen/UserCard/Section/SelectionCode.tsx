import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {Portal} from '@gorhom/portal';
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  FadeOutDown,
  Layout as RNRLayout,
  ZoomInDown,
} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {registerCallbackEndpoints} from '../../../../api/registerCallbackEndpoints';
import {
  addedSvg,
  moreSvg,
  playSoundSvg,
  startLearnSvg,
} from '../../../../assets/close';
import {reverseSvg} from '../../../../assets/collection';
import {isCheck} from '../../../../hooks/usePlaySound';
import {homeApi} from '../../../../redux/api/homeCard';
import {Inset, Queue, Stack} from '../../../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../../../styleApp/Typografy';
import {BottomSheetCustomComponent} from '../../../../styleApp/UI/BottomSheetCustomComponent';
import {Button} from '../../../../styleApp/UI/Button';
import {Units} from '../../../../styleApp/Units';
import colors, {cardColor} from '../../../../styleApp/colors';
import {Bearer} from '../../../../modal/Word';
import {iStackData} from '../renderItem';

export interface iHandleWordUpdate extends iStackData {
  handleAddedNewWord: (e: {title: string; select: string}) => () => void;
  onClose: () => void;
}
const initialStack = {
  stackId: null,
  id: null,
  title: null,
  translate: null,
} as unknown as iStackData;
export const SelectionCode = props => {
  const ref = React.useRef<BottomSheet | null>(null);
  const editRef = React.useRef<BottomSheet | null>(null);
  const [change, setChange] = React.useState<iStackData>(initialStack);
  const dispatch = useDispatch();

  const handleAddedNewWord =
    ({title, select}) =>
    async () => {
      await registerCallbackEndpoints({
        endpoints: change.stackId
          ? homeApi.endpoints.putNewWordStack
          : homeApi.endpoints.createNewWordStack,
        dispatch,
        args: {
          cardId: change?.id,
          stackId: props.stackId,
          title,
          translatedText: select,
        },
      });
      props.onRefetch();
      setChange(initialStack);
      ref.current?.close();
      editRef.current?.close();
    };

  return (
    <>
      <Inset horizontal="s24">
        <Text style={[Typography.text14, FontFamily['400']]}>
          {props.description}
        </Text>
        <Stack size="s20" />
        <Text style={[Typography.text30, FontFamily.wermut]}>
          {[t`Слова`, ' (', props.count, ')'].join('')}
        </Text>
        <Stack size="s20" />
        {props.data.map((x, el) => {
          if (!R.path(['cur', 'stackId'])(x)) {
            return (
              <Button
                key={['key', el].join('_')}
                title={t`Добавить слово`}
                onPress={() => {
                  setChange(initialStack);
                  ref.current?.snapToIndex(1);
                }}
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

          const handleUpdate = () => {
            setChange(
              R.pipe(
                R.path(['cur']),
                R.pickAll(['stackId', 'title', 'translate', 'id']),
              )(x) as iStackData,
            );
            if (!props.isAdmin) {
              Alert.alert(
                t`Выбрать`,
                t`Выбрать действие для работы со словом`,
                [
                  {
                    text: t`Обновить`,
                    onPress: () => {
                      return editRef.current?.snapToIndex(1);
                    },
                  },
                  {
                    text: t`Удалить`,
                    onPress: async () => {
                      await registerCallbackEndpoints({
                        endpoints: homeApi.endpoints.deleteNewWordStack,
                        dispatch,
                        args: {
                          cardId: x.cur.id,
                          stackId: props.stackId,
                        },
                      });
                      props.onRefetch();
                      setChange(initialStack);
                      ref.current?.close();
                      editRef.current?.close();
                    },
                  },
                  {text: t`Закрыть`, onPress: () => null, style: 'cancel'},
                ],
              );
            }
          };

          return (
            <Animated.View
              key={['key', el].join('_')}
              entering={ZoomInDown}
              exiting={FadeOutDown}
              layout={RNRLayout.duration(1400).delay(1400)}>
              <Inset
                horizontal="s16"
                vertical="s16"
                layout={StyleSheet.flatten(styles.iwp)}>
                <View style={styles.iwr}>
                  <View style={styles.iwc}>
                    <Text style={[Typography.text18, FontFamily['500']]}>
                      {x.title}
                    </Text>
                    <Stack size="s4" />
                    <Text
                      style={[
                        Typography.text14,
                        FontFamily['400'],
                        {color: colors.gray_250},
                      ]}>
                      {x.translate}
                    </Text>
                  </View>
                  <Queue size="s24" />
                  <View
                    style={[styles.cntr, Styles.iconClose, {width: Units.s24}]}>
                    <TouchableOpacity
                      onPress={x?.handlePlayMusic(el, [x.title, el].join('_'))}>
                      <SvgXml
                        xml={
                          isCheck(el, x.play, [x.title, el].join('_'))
                            ? reverseSvg
                            : playSoundSvg
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <Queue size="s24" />
                  <View
                    style={[styles.cntr, Styles.iconClose, {width: Units.s24}]}>
                    <TouchableOpacity onPress={handleUpdate}>
                      {props.isAdmin && <SvgXml xml={addedSvg} />}
                      {!props.isAdmin && <SvgXml xml={moreSvg} />}
                    </TouchableOpacity>
                  </View>
                </View>
              </Inset>
            </Animated.View>
          );
        })}
        <Stack size="s36" />
        <Button
          title={t`Учить`}
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
          <Bearer
            handleAddedNewWord={handleAddedNewWord}
            onClose={() => ref.current?.close()}
            {...change}
          />
        </BottomSheetCustomComponent>
        <BottomSheetCustomComponent ref={editRef} mode="fullscreenWithout">
          <Bearer
            handleAddedNewWord={handleAddedNewWord}
            onClose={() => editRef.current?.close()}
            {...change}
          />
        </BottomSheetCustomComponent>
      </Portal>
    </>
  );
};

export const styles = StyleSheet.create({
  btw: {borderBottomWidth: 1},
  tapBlc: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cardColor.Faded_Grass,
  },
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
