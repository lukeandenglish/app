/* eslint-disable @typescript-eslint/no-shadow */
import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CameraOptions, launchImageLibrary} from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import validator from 'validator';
import {registerCallbackEndpoints} from '../api/registerCallbackEndpoints';
import photo from '../assets/svg/photo';
import {isCheckElement, isEmptyString} from '../helper';
import {
  IUserProfile,
  actionChangeAgreements,
  actionChangeEmail,
  actionChangeImage,
  actionChangeName,
  actionChangePassword,
  actionChangePasswordRepeat,
} from '../redux/action/register';
import {registerApi} from '../redux/api/registerApi';
import {selectorUserProfile} from '../redux/api/registerApi/functions';
import {iAnimateInput} from '../styleApp/UI/AnimatedUIInput';
import {Units} from '../styleApp/Units';
import colors from '../styleApp/colors';
import cred from '../../cred';

interface iUserHookState {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  agreements: boolean;
}

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  passwordRepeat: '',
  agreements: false,
} as iUserHookState;

const CONFIG_GALLERY = {
  mediaType: 'photo',
  includeBase64: true,
} as CameraOptions;

export const useHookUserProfile = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<iUserHookState>(INITIAL_STATE);
  const [email, password, agreements, name, image, passwordRepeat] =
    useSelector(selectorUserProfile) as [
      IUserProfile['email'],
      IUserProfile['password'],
      IUserProfile['agreements'],
      IUserProfile['name'],
      IUserProfile['image'],
      IUserProfile['passwordRepeat'],
    ];

  console.log(state, email);

  const onChangeEmail = () => {
    const EMAIL = state.email as unknown as IUserProfile['email'];
    if (EMAIL.length > 3 && validator.isEmail(EMAIL)) {
      dispatch(actionChangeEmail(EMAIL));
      setState(INITIAL_STATE);
    }
  };

  const onChangepasswordRepeat = () => {
    const PASSWORD_REPEAT =
      state.passwordRepeat.trim() as unknown as IUserProfile['passwordRepeat'];
    if (PASSWORD_REPEAT.length > 3) {
      dispatch(actionChangePasswordRepeat(PASSWORD_REPEAT));
      setState(INITIAL_STATE);
    }
  };

  const onChangePassword = async () => {
    const PASSWORD =
      state.password.trim() as unknown as IUserProfile['password'];
    if (PASSWORD.length > 3) {
      dispatch(actionChangePassword(PASSWORD));
      await registerCallbackEndpoints({
        endpoints: registerApi.endpoints.signUpQuery,
        args: {},
        dispatch,
      });
      setState(INITIAL_STATE);
    }
  };

  const onChangeName = () => {
    const NAMES = state?.name?.trim() as IUserProfile['name'];
    dispatch(actionChangeName(NAMES));
    setState(INITIAL_STATE);
  };

  const handleCheckboxAgree = () => {
    dispatch(actionChangeAgreements());
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
          // backgroundColor: 'rgba(255, 87, 87, 0.4)',
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
        placeholder: isEmptyString(state.email) ? email : state.email,
        placeholderName: '',
        onEndEditing: onChangeEmail,
        onBlur: onChangeEmail,
        placeholderNameStyle: placeholderNameStyle,
        loading,
        errorMsg: '',
        onChangeText: (email: string) => {
          const value = isCheckElement(
            [email].join('').toLowerCase(),
            true,
          ) as {args: IUserProfile['email']};
          setState({...state, email: value.args});
        },
        returnTypeKey: 'next',
      } as unknown as iAnimateInput,
      passwordLogin: {
        editable: !loading,
        value: state.password,
        placeholder: password,
        onEndEditing: onChangePassword,
        placeholderName: t`Password`,
        blurOnSubmit: true,
        loading,
        onChangeText: (password: IUserProfile['password']) => {
          setState({...state, password});
        },
        returnTypeKey: 'next',
      },
      password: {
        editable: !loading,
        value: state.password,
        placeholder: password,
        onEndEditing: () => null,
        loading,
        placeholderName: t`Password`,
        blurOnSubmit: true,
        onChangeText: (password: IUserProfile['password']) => {
          setState({...state, password});
        },
        returnTypeKey: 'next',
      },
      passwordRepeat: {
        editable: !loading,
        value: state.passwordRepeat,
        placeholder: passwordRepeat,
        loading,
        onEndEditing: onChangepasswordRepeat,
        placeholderName: t`Repeat password`,
        blurOnSubmit: true,
        onChangeText: (passwordRepeat: IUserProfile['passwordRepeat']) => {
          setState({...state, passwordRepeat});
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
    backgroundColor: 'rgba(27, 24, 24, 0.25)',
    borderRadius: Units.s16,
  },
});
