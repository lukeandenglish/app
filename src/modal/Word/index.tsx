import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
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
import {closeSvg} from '../../assets/close';
import {Inset, Queue, Stack} from '../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../styleApp/Typografy';
import {Button} from '../../styleApp/UI/Button';
import {Units} from '../../styleApp/Units';
import colors, {cardColor} from '../../styleApp/colors';
import {useHookStateUpdate} from './useHookStateUpdate';
import {Layout} from '../../styleApp/Layout';
import {iHandleWordUpdate} from '../../components/HomeScreen/UserCard/Section/SelectionCode';

export const HeaderModal = ({title, onClose, onBack}) => {
  return (
    <Inset horizontal="s12">
      <View style={styles.row}>
        <TouchableOpacity
          disabled={!onBack}
          onPress={onBack}
          style={[Styles.iconClose, !onBack && {display: 'none'}]}>
          <SvgXml xml={closeSvg} />
        </TouchableOpacity>
        <View style={styles.hc}>
          <Text style={Typography.text18}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={onClose}
          disabled={!onClose}
          style={[Styles.iconClose, !onClose && {display: 'none'}]}>
          <SvgXml xml={closeSvg} />
        </TouchableOpacity>
      </View>
    </Inset>
  );
};

export const ModalButton = ({
  title,
  disabled,
  onPress,
}: {
  title: string;
  disabled: boolean;
  onPress: () => void;
}) => {
  return (
    <View style={[styles.absPos, disabled && {opacity: 0.5}]}>
      <Inset horizontal="s24" bottom="s50">
        <Button
          title={title}
          disabled={disabled}
          onPress={onPress}
          style={styles.iwba}
          styleText={Object.assign([
            styles.iwbat,
            {paddingRight: 0, minHeight: 20},
            Typography.text16,
            FontFamily['600'],
          ])}
        />
        <Stack size="s20" />
      </Inset>
    </View>
  );
};

export const ModalInput = ({inputName}) => {
  return (
    <View style={styles.btw}>
      <TextInput
        {...inputName}
        style={[Typography.text30, FontFamily.wermut]}
      />
      <Stack size="s16" />
    </View>
  );
};

export const Bearer = ({
  handleAddedNewWord,
  stackId,
  title,
  translate,
  onClose,
}: iHandleWordUpdate) => {
  const insets = useSafeAreaInsets();
  const {handleInitialState, handleCleanState, setSelect, result, inputName} =
    useHookStateUpdate();

  React.useEffect(() => {
    handleCleanState();
  }, [handleAddedNewWord]);

  React.useEffect(() => {
    handleInitialState && handleInitialState({title, translate});
  }, [stackId, title, translate]);

  const textList = R.pipe(
    R.path(['data', 'data', 'translations']),
    R.defaultTo([]),
  )(result);

  const titleHeader = stackId ? t`Редактировать слово` : t`Новое слово`;
  const isDisabled = R.anyPass([
    R.isNil,
    R.isEmpty,
    R.pipe(R.length, R.equals(1)),
  ])(inputName.selectInput.value);
  const isCheck = !R.isEmpty(textList) && textList.length !== 1;

  return (
    <>
      <BottomSheetScrollView
        contentContainerStyle={[
          styles.wrapper,
          {paddingBottom: insets.bottom},
        ]}>
        <HeaderModal title={titleHeader} onClose={onClose} onBack={undefined} />
        <Stack size="s40" />
        <Inset horizontal="s20">
          <ModalInput inputName={inputName.selectInput} />
          <Stack size="s40" />
          <ModalInput inputName={inputName.selectInput} />
        </Inset>
        {isCheck && (
          <View>
            <Inset bottom="s16" top="s24" horizontal="s20">
              <Text style={[Typography.text12, FontFamily['300']]}>
                {t`Нажмите пробел чтобы выбрать предложенный вариант или выберите альтенативные переводы`}
              </Text>
              <Stack size="s16" />
            </Inset>
            <ScrollView horizontal>
              <Queue size="s24" />
              {textList.map((x, idx) => (
                <View key={[idx].join('')} style={styles.row}>
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
        <View style={styles.hpb} />
        <KeyboardSpacer />
      </BottomSheetScrollView>
      <ModalButton
        title={stackId ? t`Обновить` : t`Добавить`}
        disabled={isDisabled}
        onPress={handleAddedNewWord({
          title: inputName.initialInput.value,
          select: inputName.selectInput.value,
        })}
      />
      <View style={[styles.absPos, isDisabled && {opacity: 0.5}]}>
        <Inset horizontal="s24" bottom="s50">
          <Button
            title={stackId ? t`Обновить` : t`Добавить`}
            disabled={isDisabled}
            onPress={handleAddedNewWord({
              title: inputName.initialInput.value,
              select: inputName.selectInput.value,
            })}
            style={styles.iwba}
            styleText={Object.assign([
              styles.iwbat,
              {paddingRight: 0, minHeight: 20},
              Typography.text16,
              FontFamily['600'],
            ])}
          />
          <Stack size="s20" />
        </Inset>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  hpb: {height: Layout.window.height / 3},
  absPos: {position: 'absolute', bottom: 0, left: 0, right: 0},
  bw: {borderWidth: 1},
  hc: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row'},
  wrapper: {
    flexGrow: 1,
  },
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
