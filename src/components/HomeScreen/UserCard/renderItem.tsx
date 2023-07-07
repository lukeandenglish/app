import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {Portal} from '@gorhom/portal';
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {registerCallbackEndpoints} from '../../../api/registerCallbackEndpoints';
import {
  addedSvg,
  closeSvg,
  playSoundSvg,
  startLearnSvg,
} from '../../../assets/close';
import {reverseSvg} from '../../../assets/collection';
import SECTION from '../../../config/section';
import {isCheck} from '../../../hooks/usePlaySound';
import {homeApi} from '../../../redux/api/homeCard';
import {Inset, Queue, Stack} from '../../../styleApp/Spacing';
import {FontFamily, Typography} from '../../../styleApp/Typografy';
import {BottomSheetCustomComponent} from '../../../styleApp/UI/BottomSheetCustomComponent';
import {Button} from '../../../styleApp/UI/Button';
import {Units} from '../../../styleApp/Units';
import colors, {cardColor} from '../../../styleApp/colors';
import {MyImage} from './Section/MyImage';
import {Result} from './Section/Result';

const Bearer = ({handleAddedNewWord}) => {
  const insets = useSafeAreaInsets();
  const [title, setState] = React.useState('');
  const [select, setSelect] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const dispatch = useDispatch();
  const ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    setState('');
    setSelect('');
    setLoading(false);
    setResult([]);
  }, [handleAddedNewWord]);
  React.useLayoutEffect(() => {
    setResult([]);
    setLoading(true);
    ref.current && clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      if (title.length !== 0) {
        registerCallbackEndpoints({
          endpoints: homeApi.endpoints.translateText,
          dispatch,
          args: {title},
        }).then(data => {
          setResult(data);
          setLoading(false);
        });
      }
    }, 2500);
    return () => ref.current && clearTimeout(ref.current);
  }, [title]);

  const textList = R.pipe(
    R.path(['data', 'data', 'translations']),
    R.defaultTo([]),
  )(result);

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        <Inset horizontal="s12">
          <View style={{flexDirection: 'row'}}>
            <View />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={Typography.text18}>Новое слово</Text>
            </View>
            <View>
              <SvgXml xml={closeSvg} />
            </View>
          </View>
        </Inset>
        <Stack size="s40" />
        <Inset horizontal="s20">
          <View style={{borderBottomWidth: 1}}>
            <TextInput
              onChangeText={setState}
              value={title}
              placeholder="Введите слово"
              style={[Typography.text30, FontFamily.wermut]}
            />
            <Stack size="s16" />
          </View>

          <Stack size="s40" />
          <View style={{borderBottomWidth: 1}}>
            <TextInput
              placeholder="Перевод не найден"
              value={select}
              onChangeText={setSelect}
              style={[Typography.text30, FontFamily.wermut]}
            />
            <Stack size="s16" />
          </View>
          <Stack size="s24" />
          {/* {loading && (
            <>
              <Stack size="s24" />
              <View style={{backgroundColor: 'red', width: 50, height: 50}} />
              <Stack size="s24" />
            </>
          )} */}
          {!R.isEmpty(textList) && (
            <View>
              <Text style={[Typography.text12, FontFamily['300']]}>
                Нажмите пробел чтобы выбрать предложенный вариант или выберите
                альтенативные переводы
              </Text>
              <Stack size="s16" />
            </View>
          )}
        </Inset>

        {!R.isEmpty(textList) && (
          <View>
            <ScrollView horizontal>
              <Queue size="s24" />
              {textList.map((x, idx) => (
                <View key={[idx].join('')} style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => setSelect(x.translatedText)}
                    style={styles.tapBlc}>
                    <Inset horizontal="s16" vertical="s10">
                      <Text style={[Typography.text14, FontFamily['500']]}>
                        {x.translatedText}
                      </Text>
                    </Inset>
                  </TouchableOpacity>
                  <Queue size="s8" />
                </View>
              ))}
              <Queue size="s24" />
            </ScrollView>
            <Stack size="s16" />
          </View>
        )}
      </View>
      <Inset
        horizontal="s24"
        bottom="s50"
        layout={StyleSheet.flatten({paddingBottom: insets.bottom})}>
        <Button
          title={t`Добавить`}
          onPress={handleAddedNewWord({
            title,
            select,
          })}
          style={styles.iwba}
          styleText={Object.assign([
            styles.iwbat,
            {paddingRight: 0, minHeight: 20},
            Typography.text16,
            FontFamily['600'],
          ])}
        />
        <Stack size="s30" />
        <KeyboardSpacer />
      </Inset>
    </View>
  );
};

const SelectionCode = props => {
  const ref = React.useRef<BottomSheet | null>(null);
  const dispatch = useDispatch();

  console.log(props);

  const handleAddedNewWord =
    ({title, select}) =>
    () => {
      registerCallbackEndpoints({
        endpoints: homeApi.endpoints.putNewWordStack,
        dispatch,
        args: {
          stackId: props.stackId,
          title,
          translatedText: select,
        },
      }).then(data => {
        props.onRefetch();
        ref.current?.close();
      });
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
                <View style={styles.cntr}>
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
          <Bearer handleAddedNewWord={handleAddedNewWord} />
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
