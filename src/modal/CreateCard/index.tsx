import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {t} from '@lingui/macro';
import * as R from 'ramda';
import {Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {registerCallbackEndpoints} from '../../api/registerCallbackEndpoints';
import {homeApi} from '../../redux/api/homeCard';
import {Layout} from '../../styleApp/Layout';
import {Stack} from '../../styleApp/Spacing';
import {Units, isCalcSize} from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import {HeaderModal, ModalButton, ModalInput} from '../Word';
import {FinishScreen} from './FinishScreen';
import {useCreateCard} from './useCreateCard';
import React from 'react';

export const CreateCard = ({onClose, stackId}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const {
    myInput,
    next,
    setNext,
    setPhoto,
    setColor,
    photo,
    color,
    title,
    listImage,
    handleInitialState,
  } = useCreateCard({stackId});

  const handleCreateCard = async () => {
    const endpoints = stackId
      ? homeApi.endpoints.editNewStack
      : homeApi.endpoints.createNewStack;

    await registerCallbackEndpoints({
      endpoints,
      dispatch,
      args: {stackId, title, fileId: R.path(['id'])(photo), color: color},
    }).then(data => {
      onClose(data?.data?.id);
      handleInitialState();
    });
  };

  if (!next) {
    return (
      <>
        <HeaderModal title={t`Название`} onClose={onClose} onBack={undefined} />
        <BottomSheetScrollView
          contentContainerStyle={[{paddingBottom: insets.bottom}, styles.ctN]}>
          <View />
          <View>
            <Stack size="s50" />
            <ModalInput inputName={myInput.selectInput} />
            <Stack size="s50" />
          </View>
          <View style={{minHeight: Layout.window.height / 2.8}}>
            <KeyboardSpacer />
          </View>
        </BottomSheetScrollView>
        <ModalButton
          title={t`Дальше`}
          onPress={() => setNext(true)}
          disabled={R.length(title) === 0}
        />
      </>
    );
  }
  if (R.isNil(photo)) {
    return (
      <BottomSheetFlatList
        ListHeaderComponent={() => (
          <HeaderModal
            title={t`Выбрать`}
            onClose={onClose}
            onBack={() => setNext(false)}
          />
        )}
        renderItem={({item}: any) => {
          return (
            <TouchableOpacity
              onPress={() => setPhoto(item)}
              style={styles.sigrp}>
              <Image source={item} style={styles.sigrp} resizeMode="cover" />
            </TouchableOpacity>
          );
        }}
        numColumns={3}
        data={R.pipe(R.path(['data', 'rows']), R.defaultTo([]))(listImage)}
      />
    );
  }

  return (
    <FinishScreen
      selectColor={color}
      setSelectColor={setColor}
      onClose={onClose}
      onBack={() => setPhoto(null)}
      title={title}
      disabled={false}
      handleCreateCard={handleCreateCard}
      photo={photo}
    />
  );
};

const styles = StyleSheet.create({
  sigrp: {
    height: isCalcSize(119),
    width: isCalcSize(119),
    backgroundColor: colors.lightPrimary,
    margin: Units.s4,
  },
  ctN: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Units.s24,
  },
});
