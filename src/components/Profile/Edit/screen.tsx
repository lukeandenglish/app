import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {KeyboardSpacer} from 'react-native-keyboard-spacer-fixed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlockHeader} from '../../../block/profile/BlockHeader';
import colors from '../../../styleApp/colors';

export default () => {
  const insets = useSafeAreaInsets();
  const scrollRef = React.useRef<ScrollView | null>(null);

  return (
    <React.Fragment>
      <ScrollView
        ref={scrollRef}
        bounces={false}
        contentContainerStyle={[
          styles.scrolView,
          {
            paddingBottom: insets.bottom + 100,
            backgroundColor: colors.lightPrimary,
          },
        ]}>
        <BlockHeader small={false} />
        <KeyboardSpacer />
      </ScrollView>
    </React.Fragment>
  );
};

export const styles = StyleSheet.create({
  borderIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  itemBlock: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  scrolView: {
    flexGrow: 1,
    backgroundColor: colors.transparent,
  },
});
