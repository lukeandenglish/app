import React from 'react';
import App from './screen';
import {
  persistor,
  // persistor,
  store,
} from './api/store';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {I18nProvider} from '@lingui/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {i18n} from '@lingui/core';
import {Provider} from 'react-redux';
import {messages as messagesEn} from './locale/en/messages';
import {messages as messagesRu} from './locale/ru/messages';
// import {PersistGate} from 'redux-persist/integration/react';
import {enableScreens} from 'react-native-screens';
import {StyleSheet} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {NotifierWrapper} from 'react-native-notifier';
import { PortalProvider } from '@gorhom/portal';

const LOCALE = ['en', 'ru'] as string[];

i18n.load({
  [LOCALE[0]]: messagesEn,
  [LOCALE[1]]: messagesRu,
});
i18n.activate(LOCALE[1]);

i18n.loadLocaleData({
  [LOCALE[0]]: {plurals: messagesEn},
  [LOCALE[1]]: {plurals: messagesRu},
});

enableScreens();

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <I18nProvider i18n={i18n}>
              <GestureHandlerRootView style={StyleSheet.absoluteFill}>
                <PortalProvider>
                  <NotifierWrapper>
                    <App />
                  </NotifierWrapper>
                </PortalProvider>
              </GestureHandlerRootView>
            </I18nProvider>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </PersistGate>
    </Provider>
  );
};
