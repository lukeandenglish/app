import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CameraOptions, launchImageLibrary} from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import validator from 'validator';
import photo from '../assets/svg/photo';
import REDUCER_PATH from '../config/reducer';
import {
  IUserProfile,
  actionChangeAgreements,
  actionChangeEmail,
  actionChangeImage,
  actionChangeName,
  actionChangePassword,
  actionChangePasswordRepeat,
} from '../redux/action/register';
import {Units} from '../styleApp/Units';

const IMAGE =
  'https://searchengineland.com/wp-content/seloads/2015/12/google-amp-fast-speed-travel-ss-1920-1536x864.jpg';

interface iUserHookState {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  passwordRepeat: '',
} as iUserHookState;

const CONFIG_GALLERY = {
  mediaType: 'photo',
  includeBase64: true,
} as CameraOptions;

export const useHookUserProfile = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<iUserHookState>(INITIAL_STATE);
  const [email, password, agreements, name, image, passwordRepeat] =
    useSelector(
      R.pipe(
        R.path([REDUCER_PATH.USER]),
        R.paths([
          ['email'],
          ['password'],
          ['agreements'],
          ['name'],
          ['image'],
          ['passwordRepeat'],
        ]),
      ),
    ) as [
      IUserProfile['email'],
      IUserProfile['password'],
      IUserProfile['agreements'],
      IUserProfile['name'],
      IUserProfile['image'],
      IUserProfile['passwordRepeat'],
    ];

  const onChangeEmail = () => {
    const EMAIL = state.email?.trim() as IUserProfile['email'];
    if (EMAIL.length > 3 && validator.isEmail(EMAIL)) {
      dispatch(actionChangeEmail(EMAIL));
      setState(INITIAL_STATE);
    }
  };

  const onChangepasswordRepeat = () => {
    const PASSWORD_REPEAT =
      state.passwordRepeat.trim() as IUserProfile['passwordRepeat'];
    if (PASSWORD_REPEAT.length > 3) {
      dispatch(actionChangePasswordRepeat(PASSWORD_REPEAT));
      setState(INITIAL_STATE);
    }
  };

  const onChangePassword = () => {
    const PASSWORD = state.password.trim() as IUserProfile['password'];
    if (PASSWORD.length > 3) {
      dispatch(actionChangePassword(PASSWORD));
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

  console.log(state, validator.isMobilePhone(state.email));

  const placeHolderName = R.pipe(
    R.path(['email']),
    R.defaultTo(''),
    R.cond([
      [
        R.pipe(validator.isMobilePhone),
        R.always(t`Register with telephone number`),
      ],
      [R.pipe(validator.isEmail), R.always(t`Register with email`)],
      [R.F, R.always(t`Mail or telephone`)],
      [R.T, R.always(t`Mail or telephone`)],
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
          uri: image ?? IMAGE,
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
        placeholder: email,
        placeholderName: placeHolderName,
        onEndEditing: onChangeEmail,
        blurOnSubmit: true,
        onChangeText: (email: IUserProfile['email']) => {
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
        onChangeText: (password: IUserProfile['password']) => {
          setState({...state, password});
        },
        returnTypeKey: 'next',
      },
      passwordRepeat: {
        editable: !loading,
        value: state.passwordRepeat,
        placeholder: passwordRepeat,
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
