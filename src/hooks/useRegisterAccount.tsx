import {t} from '@lingui/macro';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {registerCallbackEndpoints} from '../api/registerCallbackEndpoints';
import {registerApi} from '../redux/api/registerApi';
import {useNavigation} from '@react-navigation/native';
import ROUTER_PAGE from '../config/page';
import validator from 'validator';
import * as R from 'ramda';
import {isMobileHelperPhone} from '../helper/isMobileHelperPhone';

export const useRegisterAccount = () => {
  const [value, setValue] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mode, setMode] = React.useState('EMAIL');
  const [active, setInactive] = React.useState(true);
  const dispatch = useDispatch();
  const valueRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const navigation = useNavigation();

  const mobileHelper = isMobileHelperPhone(value);

  const refNext = [
    {ref: valueRef, value: value},
    {
      ref: passwordRef,
      value: password,
    },
  ];

  const handleChangeText = e => {
    setValue(R.toLower(e));
  };
  const handleChangePasswordText = e => {
    setPassword(e);
  };

  const handleLoginAccount = async () => {
    try {
      const data = await registerCallbackEndpoints({
        endpoints: registerApi.endpoints.login,
        dispatch,
        args: {
          type: mode,
          email: mobileHelper?.phone ? '' : value,
          phone: mobileHelper?.phone ?? '',
          password: password,
        },
      });
      if (data?.error?.message) {
        handleRegisterAccount();
      }
    } catch (e) {
      console.log('', e);
    }
  };
  const handleRegisterAccount = async () => {
    try {
      const data = await registerCallbackEndpoints({
        endpoints: registerApi.endpoints.signUp,
        dispatch,
        args: {
          type: mode,
          email: mobileHelper?.phone ? '' : value,
          phone: mobileHelper?.phone ?? '',
          password: password,
        },
      });
      if (data?.data?.id) {
        navigation.navigate(ROUTER_PAGE.UNAUTH.Verification, {
          type: mode,
          email: mobileHelper?.phone ? '' : value,
          phone: mobileHelper?.phone ?? '',
          password: password,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const funcIdentity = () => {
    let data;
    if (validator.isMobilePhone(mobileHelper?.phone ?? '')) {
      data = 'PHONE';
    }
    if (validator.isEmail(value)) {
      data = 'EMAIL';
    }
    if (data !== 'EMAIL' && validator.isAlphanumeric(value)) {
      console.log('email', data);
      data = null;
    }
    setMode(data);
  };

  React.useEffect(() => funcIdentity(), [value]);

  const buttonDisabled = React.useMemo(() => {
    let disabled = true;
    if (mode) {
      disabled = false;
    }
    if (!disabled && password.length <= 6) {
      disabled = true;
    }

    console.log(password.length);
    return disabled;
  }, [value, password, mode]);

  return {
    buttonDisabled,
    handleLoginAccount,
    handleRegisterAccount,
    inputValue: {
      name: 'name',
      ref: refNext[0]?.ref,
      value: active
        ? isMobileHelperPhone(value)?.formatInternational
        : value.toLowerCase(),
      onBlur: () => setInactive(true),
      autoCapitalize: 'none',
      onFocus: () => setInactive(false),
      onChangeText: handleChangeText,
      placeholder: isMobileHelperPhone(value)?.formatInternational
        ? isMobileHelperPhone(value)?.formatInternational
        : t`E-mail или телефон`,
    },
    inputPassword: {
      name: 'password',
      ref: refNext[1]?.ref,
      autoCapitalize: 'none',
      value: password,
      onChangeText: handleChangePasswordText,
      placeholder: t`Введите пароль`,
    },
  };
};
