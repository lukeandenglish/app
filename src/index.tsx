import React from 'react';
import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
import App from './page/index';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PersistGate} from 'redux-persist/integration/react';
import {I18nProvider} from '@lingui/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {i18n} from '@lingui/core';
import {enableScreens} from 'react-native-screens';
import {NotifierWrapper} from 'react-native-notifier';

enableScreens();

const LOCALE = ['en', 'ru'] as string[];

i18n.load({
  [LOCALE[0]]: {},
  [LOCALE[1]]: {},
});
i18n.activate(LOCALE[1]);

i18n.loadLocaleData({
  [LOCALE[0]]: {plurals: {}},
  [LOCALE[1]]: {plurals: {}},
});

const AppProvider = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <I18nProvider i18n={i18n}>
              <BottomSheetModalProvider>
                <NotifierWrapper>
                  <App />
                </NotifierWrapper>
              </BottomSheetModalProvider>
            </I18nProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
