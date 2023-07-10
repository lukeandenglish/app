import {t} from '@lingui/macro';
import * as R from 'ramda';
import React from 'react';
import {useDispatch} from 'react-redux';
import {registerCallbackEndpoints} from '../../api/registerCallbackEndpoints';
import {homeApi} from '../../redux/api/homeCard';
import {Keyboard} from 'react-native';

export const useHookStateUpdate = () => {
  const [state, setState] = React.useState<string>('');
  const [select, setSelect] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const ref = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCleanState = () => {
    setState('');
    setSelect('');
    setLoading(false);
    setResult([]);
  };

  const handleInitialState = ({title, translate}) => {
    setState(title ?? '');
    setSelect(translate ?? '');
    setLoading(false);
    setResult([]);
  };
  const handleLoadState = async (text: string) => {
    setResult([]);
    setLoading(true);
    setSelect('');
    if (text.length > 0) {
      ref.current && clearTimeout(ref.current);
      ref.current = setTimeout(async () => {
        const data = await registerCallbackEndpoints({
          endpoints: homeApi.endpoints.translateText,
          dispatch,
          args: {title: text},
        });
        setResult(data);
        setSelect(
          R.pipe(
            R.path(['data', 'data', 'translations', 0, 'translatedText']),
            R.defaultTo(''),
          )(data),
        );
        setLoading(false);
        Keyboard.dismiss();
      }, 2500);
    }
  };

  const inputName = {
    initialInput: {
      onChangeText: (e: string) => {
        setState(e);
        handleLoadState(e);
      },
      onEndEditing: () => {
        handleLoadState(state);
      },
      onSubmitEditing: () => {
        handleLoadState(state);
      },
      value: state,
      multiline: true,
      numberOfLines: 10,
      placeholder: t`Введите слово`,
    },
    selectInput: {
      placeholder: loading ? t`Loading...` : t`Перевод не найден`,
      disabled: loading,
      value: select,
      multiline: true,
      numberOfLines: 10,
      onChangeText: setSelect,
    },
  };

  return {
    handleInitialState,
    handleLoadState,
    handleCleanState,
    state,
    select,
    setSelect,
    loading,
    result,
    inputName,
  };
};
