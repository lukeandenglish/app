import {t} from '@lingui/macro';
import * as React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {registerApi} from '../../../redux/api/registerApi';
import {Stack} from '../../../styleApp/Spacing';
import {Button} from '../../../styleApp/UI/Button';
import {LabelText} from '../../../styleApp/UI/LabelText';
import {Units} from '../../../styleApp/Units';
import {default as colors} from '../../../styleApp/colors';
import {styles} from '../screen';

export function BlockSelect({disabled}: {disabled: boolean}) {
  const dispatchRedux = useDispatch();

  const handleSignApple = registerApi.endpoints.handleSignApple as any;
  const handleSignGoogle = registerApi.endpoints.handleSignGoogle as any;

  return (
    <>
      <View style={{height: Units.s44}}>
        <View />
      </View>
      <LabelText
        title={t`Войдите или зарегистрируйтесь`}
        style={Object.assign([styles.text, styles.textPosition])}
      />
      <Stack size="s16" />
      <LabelText
        title={t`Создайте аккаунт, чтобы не потерять свой прогресс на другом устройстве`}
        style={Object.assign([styles.text1, styles.text1Typo])}
      />
      <Stack size="s24" />
      <Button
        disabled={disabled}
        onPress={() => {
          dispatchRedux(handleSignApple.initiate());
        }}
        title={t`Continue with Apple`}
        styleText={{color: colors.lightPrimary}}
        style={{backgroundColor: colors.lightInk}}
      />
      <Stack size="s10" />
      <Button
        disabled={disabled}
        onPress={() => dispatchRedux(handleSignGoogle.initiate())}
        title={t`Sign up with Google`}
        styleText={{color: colors.lightInk}}
        style={{backgroundColor: colors.transparent, borderWidth: 1}}
      />
    </>
  );
}
