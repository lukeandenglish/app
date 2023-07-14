import {t} from '@lingui/macro';
import {useFocusEffect} from '@react-navigation/native';
import * as R from 'ramda';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import REDUCER_PATH from '../config/reducer';
import {isMobileHelperPhone} from '../helper/isMobileHelperPhone';
import {
  actionChangeUserEmail,
  actionChangeUserName,
  actionChangeUserPhone,
  actionChangeUserSurName,
} from '../redux/action/register';
import {registerApi} from '../redux/api/registerApi';
import {registerCallbackEndpoints} from '../api/registerCallbackEndpoints';
import {homeApi} from '../redux/api/homeCard';

export const useEditProfile = () => {
  const logOutUser = registerApi.endpoints.logOutUser as any;
  const deleteUser = registerApi.endpoints.deleteUser as any;
  const dispatchRedux = useDispatch();
  const [rPhone, rName, rSurname, rEmail] = useSelector(
    R.pipe(
      R.path([REDUCER_PATH.USER]),
      R.paths<string>([['phone'], ['name'], ['surname'], ['email']]),
    ),
  );

  const [name, setName] = React.useState<string>('');
  const [surName, setSurName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');

  const refName = React.useRef(null);
  const refEmail = React.useRef(null);
  const refSurname = React.useRef(null);
  const refPhone = React.useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      setName(rName ?? '');
      setSurName(rSurname ?? '');
      setEmail(rEmail ?? '');
      setPhone(rPhone ?? '');
    }, []),
  );

  const handleChangeText = {
    onChangeText: (e: string) => setName(e),
    onSubmitEditing: () => dispatchRedux(actionChangeUserName(name)),
    onEndEditing: () => dispatchRedux(actionChangeUserName(name)),
    onBlur: () => dispatchRedux(actionChangeUserName(name)),
    blurOnSubmit: true,
  };
  const handleChangeSurnameText = {
    onChangeText: (e: string) => setSurName(e),
    onSubmitEditing: () => dispatchRedux(actionChangeUserSurName(surName)),
    onEndEditing: () => dispatchRedux(actionChangeUserSurName(surName)),
    onBlur: () => dispatchRedux(actionChangeUserSurName(surName)),
    blurOnSubmit: true,
  };
  const handleChangeEmailText = {
    onChangeText: (e: string) => setEmail(e),
    onSubmitEditing: () => dispatchRedux(actionChangeUserEmail(email)),
    onEndEditing: () => dispatchRedux(actionChangeUserEmail(email)),
    onBlur: () => dispatchRedux(actionChangeUserEmail(email)),
    blurOnSubmit: true,
  };
  const handleChangePhoneText = {
    onChangeText: (e: string) => setPhone(e),
    onSubmitEditing: () => dispatchRedux(actionChangeUserPhone(phone)),
    onEndEditing: () => dispatchRedux(actionChangeUserPhone(phone)),
    onBlur: () => dispatchRedux(actionChangeUserPhone(phone)),
    blurOnSubmit: true,
  };

  return {
    inputName: {
      placeholderName: 'Имя',
      ref: refName,
      name: 'name',
      value: name,
      placeholder: t`Введите имя`,
      ...handleChangeText,
    },
    inputEmail: {
      placeholderName: 'Email',
      ref: refEmail,
      name: 'email',
      value: email,
      autoCapitalize: 'none',
      placeholder: t`Введите почту`,
      ...handleChangeEmailText,
    },
    inputSurname: {
      placeholderName: 'Фамилия',
      ref: refSurname,
      value: surName,
      name: 'surName',
      placeholder: t`Введите фамилию`,
      ...handleChangeSurnameText,
    },
    inputPhone: {
      placeholderName: 'Телефон',
      ref: refPhone,
      name: 'name',
      value: isMobileHelperPhone(phone)?.formatInternational,
      autoCapitalize: 'none',
      placeholder: t`Введите номер`,
      ...handleChangePhoneText,
    },
    btn: {
      logOut: {
        onPress: () => dispatchRedux(logOutUser.initiate()),
        disabled: false,
        title: t`Log out`,
      },
      onDelete: {
        onPress: () => dispatchRedux(deleteUser.initiate()),
        disabled: false,
        title: t`Delete account`,
      },
      setBaseLevel: {
        onPress: () =>
          registerCallbackEndpoints({
            endpoints: homeApi.endpoints.setLevelStart,
            dispatch: dispatchRedux,
            args: {level: 'ZERO'},
          }),
        disabled: false,
        title: t`Установить базовый уровень английского`,
      },
    },
  };
};
