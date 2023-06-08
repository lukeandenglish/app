import {t} from '@lingui/macro';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {
  actionChangeAgreements,
  actionChangePassword,
  actionChangePasswordRepeat,
} from '../redux/action/register';
import {registerApi} from '../redux/api/registerApi';
import {useNavigation} from '@react-navigation/native';

export const useButtonRegister = () => {
  const receiveQuery = registerApi.endpoints.receiveQuery as any;
  const navigation = useNavigation();

  const dispatchRedux = useDispatch();

  const [isRegister, setChangeRegister] = React.useState(false);

  const changeRegister = () => {
    dispatchRedux(actionChangePassword(''));
    dispatchRedux(actionChangePasswordRepeat(''));
    dispatchRedux(actionChangeAgreements(false));
    setChangeRegister(!isRegister);
  };

  const BtnProps = isRegister
    ? {
        title: t`Login`,
        onPress: () => {
          changeRegister();
        },
        disabled: false,
      }
    : {
        title: t`Register`,
        onPress: () => {
          changeRegister();
        },
        disabled: false,
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
