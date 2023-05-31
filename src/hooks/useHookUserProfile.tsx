import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CameraOptions, launchImageLibrary} from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import photo from '../assets/svg/photo';
import REDUCER_PATH from '../config/reducer';
import {
  IUserProfile,
  actionChangeAgreements,
  actionChangeEmail,
  actionChangeImage,
  actionChangeName,
  actionChangePassword,
} from '../redux/action/register';
import {Units} from '../styleApp/Units';

const IMAGE =
  'https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920-1536x864.jpg';

const INITIAL_STATE = {
  name: 'Slava Yakimov',
  email: '',
  password: '',
};

const CONFIG_GALLERY = {
  mediaType: 'photo',
  includeBase64: true,
} as CameraOptions;

export const useHookUserProfile = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<{
    password: string;
    email: string;
    name: string;
  }>(INITIAL_STATE);
  const [email, password, agreements, name, image] = useSelector(
    R.pipe(
      R.path([REDUCER_PATH.USER]),
      R.paths([['email'], ['password'], ['agreements'], ['name'], ['image']]),
    ),
  ) as [
    IUserProfile['email'],
    IUserProfile['password'],
    IUserProfile['agreements'],
    IUserProfile['name'],
  ];

  const onChangeEmail = () => {
    dispatch(actionChangeEmail(state.email.trim()));
    setState(INITIAL_STATE);
  };

  const onChangePassword = () => {
    dispatch(actionChangePassword(state.password.trim()));
    setState(INITIAL_STATE);
  };

  const onChangeName = () => {
    dispatch(actionChangeName(state.name.trim()));
    setState(INITIAL_STATE);
  };

  const handleCheckboxAgree = () => {
    dispatch(actionChangeAgreements());
  };

  const loading = false;

  return [
    {
      name: {
        editable: !loading,
        value: state.name,
        placeholder: name ?? 'Name Lastname',
        placeholderName: t`Full name (optional)`,
        onChangeText: (name: string) => {
          setState({...state, name});
        },
        onEndEditing: onChangeName,
        blurOnSubmit: true,
        returnTypeKey: 'next',
        name: R.pipe(R.defaultTo(' '), R.split(' '), R.path([0]))(name),
        surname: R.pipe(R.defaultTo(' '), R.split(' '), R.path([1]))(name),
      },
      surname: {
        value: 'Yakimov',
      },
      image: {
        onPress: () => {
          try {
            launchImageLibrary(CONFIG_GALLERY, responce => {
              dispatch(
                actionChangeImage(
                  'data:image/jpeg;base64,' + responce?.assets?.[0]?.base64 ??
                    null,
                ),
              );
            });
          } catch (e) {
            console.log(e);
          }
        },
        source: {
          uri: image ?? IMAGE,
        },
        style: {
          backgroundColor: 'rgba(255, 87, 87, 0.4)',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        },
        children: () => (
          <View style={styles.imageBck}>
            <SvgXml xml={photo} />
          </View>
        ),
      },
      email: {
        editable: !loading,
        value: state.email,
        placeholder: email,
        placeholderName: t`Mail or telephone`,
        onEndEditing: onChangeEmail,
        blurOnSubmit: true,
        onChangeText: (email: string) => {
          setState({...state, email});
        },
        returnTypeKey: 'next',
      },
      password: {
        editable: !loading,
        value: state.password,
        placeholder: password,
        onEndEditing: onChangePassword,
        placeholderName: t`Password`,
        blurOnSubmit: true,
        onChangeText: (password: string) => {
          setState({...state, password});
        },
        returnTypeKey: 'next',
      },
      agreements: {
        editable: loading,
        value: agreements,
      },
    },
    {
      loading,
      setState,
      onChangePassword,
      onChangeEmail,
      handleCheckboxAgree,
      onChangeName,
    },
  ];
};

const styles = StyleSheet.create({
  imageBck: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(27, 24, 24, 0.444)',
    borderRadius: Units.s16,
  },
});
