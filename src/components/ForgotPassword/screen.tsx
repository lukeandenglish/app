import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {t} from '@lingui/macro';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as R from 'ramda';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {registerCallbackEndpoints} from '../../api/registerCallbackEndpoints';
import {closeSvg} from '../../assets/close';
import REDUCER_PATH from '../../config/reducer';
import {isMobileHelperPhone} from '../../helper/isMobileHelperPhone';
import {registerApi} from '../../redux/api/registerApi';
import {Layout} from '../../styleApp/Layout';
import {Stack} from '../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../styleApp/Typografy';
import {LabelText} from '../../styleApp/UI/LabelText';
import {Units, isCalcSize} from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import {SelectInput} from './SelectInput';

const INITIAL_TIMER = 60;

const LogInOrRegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const ref = React.useRef(null);
  const refTimer = React.useRef(null);
  const navigation = useNavigation();
  const [state, setState] = React.useState('');
  const [timer, setTimer] = React.useState<number>(0);
  const route = useRoute();

  const dispatch = useDispatch();
  const [userId, email, phone] = useSelector(
    R.pipe(R.path([REDUCER_PATH.USER]), R.paths<string[]>([['userId']])),
  );

  React.useEffect(() => {
    refTimer.current = setTimeout(() => {
      const newTimer = timer - 1;
      if (newTimer >= 0) {
        setTimer(newTimer);
      }
    }, 1000);

    return () => refTimer.current && clearTimeout(refTimer.current);
  }, [timer]);

  useFocusEffect(
    React.useCallback(() => {
      if (!userId) {
        navigation.goBack();
      }
      setTimer(INITIAL_TIMER);
      return () => {
        setTimer(0);
        refTimer.current && clearTimeout(refTimer.current);
      };
    }, []),
  );

  const onSubmit = async token => {
    await registerCallbackEndpoints({
      endpoints: registerApi.endpoints.phoneVerify,
      dispatch,
      args: {userId, token},
    });
    setState('');
  };

  return (
    <ScrollView
      ref={ref}
      bounces={false}
      contentContainerStyle={[
        styles.growblock,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <TouchableOpacity onPress={navigation.goBack} style={[Styles.iconClose]}>
        <SvgXml xml={closeSvg} />
      </TouchableOpacity>
      <Stack size="s24" />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <LabelText
          mode="desc"
          title={t`Теперь код`}
          style={Object.assign([
            {color: colors.lightInk, textAlign: 'center'},
            Typography.text30,
            FontFamily.wermut,
          ])}
        />
        <Stack size="s16" />
        <LabelText
          mode="desc"
          title={
            email
              ? t`Мы отправили вам код на адресс почты`
              : t`Мы отправили вам код на телефон`
          }
          style={Object.assign([
            {color: colors.lightInk, textAlign: 'center'},
            Typography.text14,
            FontFamily.wermut,
          ])}
        />
        <LabelText
          mode="desc"
          title={email ?? isMobileHelperPhone(phone ?? '')?.formatInternational}
          style={Object.assign([
            {color: colors.lightInk, textAlign: 'center'},
            Typography.text14,
            FontFamily.wermut,
          ])}
        />

        <Stack size="s50" />
        <SelectInput onSubmit={onSubmit} state={state} setState={setState} />
        <Stack size="s24" />

        <TouchableOpacity
          disabled={timer !== 0}
          onPress={async () => {
            await registerCallbackEndpoints({
              endpoints: registerApi.endpoints.signUp,
              dispatch,
              args: route.params,
            }).then(() => setTimer(INITIAL_TIMER));
          }}>
          <LabelText
            mode="desc"
            title={t`Отправить еще раз ${
              timer !== 0 ? ['(', timer, ')'].join('') : ''
            }`}
            style={Object.assign([
              {color: colors.lightInk, textAlign: 'center'},
              Typography.text14,
              FontFamily.wermut,
            ])}
          />
        </TouchableOpacity>
      </View>
      <Stack size="s50" />
    </ScrollView>
  );
};

export default LogInOrRegisterScreen;

const styles = StyleSheet.create({
  blockitem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nexicon: {
    width: Units.s48,
    height: Units.s48,
    borderRadius: Units.s50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightInk,
  },
  ima: {
    borderWidth: Units.s1,
    height: isCalcSize(224),
    width: isCalcSize(193),
  },
  cen: {justifyContent: 'center', alignItems: 'center'},
  flex: {flex: 1},
  growblock: {
    backgroundColor: colors.lemon,
    flexGrow: 1,
    paddingHorizontal: Units.s20,
    borderWidth: Units.s1,
    minHeight: Layout.window.height,
  },
  soicon: {
    width: Units.s64,
    height: Units.s64,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Units.s1,
    borderRadius: Units.s50,
  },
});
