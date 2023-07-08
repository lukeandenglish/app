import {BottomSheetFlatList, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
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
import colors, {cardColor} from '../../styleApp/colors';
import {HeaderModal, ModalButton, ModalInput} from '../Word';
import {FinishScreen} from './FinishScreen';

export const CreateCard = ({onClose}) => {
  const insets = useSafeAreaInsets();
  const [next, setNext] = React.useState(false);

  const [listImage, setListImage] = React.useState({});
  const [title, setTitleSelect] = React.useState('');
  const dispatch = useDispatch();
  const [photo, setPhoto] = React.useState({});
  const [color, setColor] = React.useState(cardColor.Blue_Sky);

  const handleCreateCard = () => {
    registerCallbackEndpoints({
      endpoints: homeApi.endpoints.getListIllustration,
      dispatch,
      args: {title, photo, color: color},
    });
  };

  const myInput = {
    selectInput: {
      placeholder: t`Новый стэк`,
      value: title,
      multiline: true,
      numberOfLines: 10,
      onChangeText: setTitleSelect,

      style: {textAlign: 'center'},
    },
  };

  React.useEffect(() => {
    registerCallbackEndpoints({
      endpoints: homeApi.endpoints.getListIllustration,
      dispatch,
      args: {},
    }).then(setListImage);
  }, [dispatch]);

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
  if (R.isEmpty(photo)) {
    return (
      <BottomSheetFlatList
        ListHeaderComponent={() => (
          <HeaderModal
            title={t`Название`}
            onClose={onClose}
            onBack={() => setNext(false)}
          />
        )}
        renderItem={({item}: any) => {
          return (
            <TouchableOpacity
              onPress={() => setPhoto({photo: item})}
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
      onBack={() => setPhoto({})}
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
