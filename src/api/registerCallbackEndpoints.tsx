import * as R from 'ramda';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {AppDispatch, store} from './store';

export const registerCallbackEndpoints = async ({
  endpoints,
  args,
  dispatch,
}: {
  endpoints: any;
  args: any;
  dispatch: AppDispatch;
}) => {
  try {
    const customDispatch = dispatch ?? store.dispatch;
    const result = await customDispatch(
      endpoints.initiate(args, {forceRefetch: true}),
    );
    if (result.isError) {
      return errorBuilderMessage({
        args,
        extra: {error: result.error.data?.error},
      });
    }

    return R.pickAll(['data', 'error'])(result);
  } catch (e) {
    return errorBuilderMessage({args, extra: {error: e.message}});
  }
};

export const errorBuilderMessage = ({args, extra}) => {
  let initialState = {
    data: null,
    error: {
      message: 'error',
      args,
      extra,
    },
  };
  Notifier.showNotification({
    title: 'The request was failed',
    description: JSON.stringify(initialState.error.extra),
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: 'error',
    },
  });
  return initialState;
};
