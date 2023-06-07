import {t} from '@lingui/macro';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {
  actionChangeAgreements,
  actionChangePassword,
  actionChangePasswordRepeat,
} from '../../redux/action/register';
import {registerApi} from '../../redux/api/registerApi';
import {useNavigation} from '@react-navigation/native';

export const useButtonRegister = () => {
  const signUpQuery = registerApi.endpoints.signUpQuery as any;
  const loginQuery = registerApi.endpoints.loginQuery as any;
  const receiveQuery = registerApi.endpoints.receiveQuery as any;
  const navigation = useNavigation();

  const dispatchRedux = useDispatch();

  const [isRegister, setChangeRegister] = React.useState(false);

  const BtnProps = isRegister
    ? {
        title: t`Login`,
        onPress: () =>
          dispatchRedux(loginQuery.initiate({})).catch(console.info),
      }
    : {
        title: t`Register`,
        onPress: () =>
          dispatchRedux(signUpQuery.initiate({})).catch(console.info),
      };

  const changeRegister = () => {
    dispatchRedux(actionChangePassword(''));
    dispatchRedux(actionChangePasswordRepeat(''));
    dispatchRedux(actionChangeAgreements(false));
    setChangeRegister(!isRegister);
  };

  const ReceiveEmail = {
    title: t`Восстановить пароль`,
    onPress: () =>
      dispatchRedux(receiveQuery.initiate({}))
        .then(navigation.goBack)
        .catch(console.info),
  };

  return {
    ReceiveEmail,
    BtnProps,
    isRegister,
    changeRegister,
  };
};
