import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {i18n} from '@lingui/core';
import {I18nProvider} from '@lingui/react';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {
  persistor,
  // persistor,
  store,
} from './api/store';
import {messages as messagesEn} from './locale/en/messages';
import {messages as messagesRu} from './locale/ru/messages';
import App from './screen';
// import {PersistGate} from 'redux-persist/integration/react';
import {PortalProvider} from '@gorhom/portal';
import {StyleSheet} from 'react-native';
import {NotifierWrapper} from 'react-native-notifier';
import {enableScreens} from 'react-native-screens';
import {PersistGate} from 'redux-persist/integration/react';

import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import colors from './styleApp/colors';
import {FontFamily} from './styleApp/Typografy';

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
  style: {
    ...FontFamily[400],
    color: colors.lightInk,
  },
};

// Setting default styles for all Text components.
const customTextProps = {
  style: {
    fontSize: 16,
    ...FontFamily[400],
    color: colors.lightInk,
  },
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

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
        <GestureHandlerRootView style={StyleSheet.absoluteFill}>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <I18nProvider i18n={i18n}>
                <PortalProvider>
                  <NotifierWrapper>
                    <App />
                  </NotifierWrapper>
                </PortalProvider>
              </I18nProvider>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};
