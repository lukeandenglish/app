/* eslint-disable @typescript-eslint/no-shadow */
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CameraOptions, launchImageLibrary} from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import validator from 'validator';
import cred from '../../cred';
import photo from '../assets/svg/photo';
import {isCheckElement, isEmptyString, regNumber} from '../helper';
import {
  IUserProfile,
  actionChangeImage,
  actionChangeUserEmail,
  actionChangeUserName,
  actionChangeUserPhone,
} from '../redux/action/register';
import {selectorAuthUserProfile} from '../redux/api/registerApi/functions';
import {iAnimateInput} from '../styleApp/UI/AnimatedUIInput';
import {Units} from '../styleApp/Units';
import colors from '../styleApp/colors';
import {registerCallbackEndpoints} from '../api/registerCallbackEndpoints';
import {deckCard} from '../redux/api/deckCard';

interface iUserHookState {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordRepeat: string;
  agreements: boolean;
}

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  phone: '',
  passwordRepeat: '',
  agreements: false,
} as iUserHookState;

const CONFIG_GALLERY = {
  mediaType: 'photo',
  includeBase64: true,
} as CameraOptions;

export const useHookChangeProfile = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<iUserHookState>(INITIAL_STATE);
  const [email, phone, name, image] = useSelector(selectorAuthUserProfile) as [
    IUserProfile['email'],
    IUserProfile['phone'],
    IUserProfile['name'],
    IUserProfile['image'],
  ];

  const onChangeEmail = () => {
    const EMAIL = state.email.trim() as IUserProfile['email'];
    if (EMAIL.length > 3 && validator.isEmail(EMAIL)) {
      dispatch(actionChangeUserEmail(EMAIL));
      // registerCallbackEndpoints({
      //   endpoints: deckCard.endpoints.updateMyProfile,
      //   dispatch,
      //   args: {email: EMAIL},
      // });
    }
    setState(INITIAL_STATE);
  };

  const onChangePhone = () => {
    const PHONE = state.phone.trim() as IUserProfile['phone'];
    if (PHONE?.length > 3 && validator.isMobilePhone(PHONE)) {
      dispatch(actionChangeUserPhone(regNumber(PHONE)));
      // registerCallbackEndpoints({
      //   endpoints: deckCard.endpoints.updateMyProfile,
      //   dispatch,
      //   args: {phone: phone},
      // });
    }
    setState(INITIAL_STATE);
  };

  const onChangeName = () => {
    const NAMES = state?.name?.trim() as IUserProfile['name'];
    dispatch(actionChangeUserName(NAMES));
    setState(INITIAL_STATE);
    registerCallbackEndpoints({
      endpoints: deckCard.endpoints.updateMyProfile,
      dispatch,
      args: {username: NAMES},
    });
  };

  const loading = false;

  const placeholderNameStyle = R.pipe(
    R.path(['email']),
    R.defaultTo(''),
    x => (isEmptyString(x) ? email : x),
    isCheckElement,
    R.cond([
      [R.whereEq({phone: true}), R.always(colors.gray_200)],
      [R.whereEq({email: true}), R.always(colors.gray_200)],
      [R.F, R.always(colors.bodyText)],
      [R.T, R.always(colors.bodyText)],
    ]),
  )(state);

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
          uri: image ?? cred.EMPTY_IMAGE,
        },
        style: {
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
        editable: false,
        value: state.email,
        placeholder: isEmptyString(state.email) ? email : state.email,
        placeholderName: t`Email`,
        onEndEditing: onChangeEmail,
        onBlur: onChangeEmail,
        placeholderNameStyle: placeholderNameStyle,
        loading,
        errorMsg: '',
        onChangeText: React.useCallback(
          (email: string) => {
            const value = isCheckElement(
              [email].join('').toLowerCase(),
              true,
            ) as {args: IUserProfile['email']};
            setState({...state, email: value.args});
          },
          [state.email],
        ),
        returnTypeKey: 'next',
      } as unknown as iAnimateInput,
      phone: {
        editable: !loading,
        value: state.phone,
        placeholder: isEmptyString(state.phone) ? phone : state.phone,
        placeholderName: t`Phone`,
        onEndEditing: onChangePhone,
        onBlur: onChangePhone,
        placeholderNameStyle: placeholderNameStyle,
        loading,
        errorMsg: '',
        onChangeText: React.useCallback(
          (phone: string) => {
            const value = isCheckElement(
              [phone].join('').toLowerCase(),
              true,
            ) as {args: IUserProfile['phone']};
            setState({...state, phone: value.args});
          },
          [state.phone],
        ),
        returnTypeKey: 'next',
      } as unknown as iAnimateInput,
    },
    {
      loading,
      setState,
      onChangeEmail,
      onChangePhone,
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
    backgroundColor: 'rgba(27, 24, 24, 0.25)',
    borderRadius: Units.s16,
  },
});
