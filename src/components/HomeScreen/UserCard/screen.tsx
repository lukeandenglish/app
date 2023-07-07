/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Dimensions, SectionList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container} from '../../../styleApp/UI/Container';
import {Units} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';
import {useGetCurrentStack} from './hooks';
import {renderItem} from './renderItem';

export const WIDTH = Dimensions.get('screen').width;

const App = () => {
  const insets = useSafeAreaInsets();
  const sectionListRef = React.useRef<SectionList | null>(null);
  const [data] = useGetCurrentStack();
  const route = useRoute();

  return (
    <Container
      notPaddingTop={false}
      background={
        !route?.params?.data?.admin ? colors.pink : colors.faded_flam
      }>
      <SectionList
        ref={sectionListRef}
        sections={data as any[]}
        extraData={data}
        bounces={false}
        keyExtractor={(item, index) => [item, index].join('_')}
        ItemSeparatorComponent={() => (
          <View style={{borderWidth: 1, height: 2, width: 450}} />
        )}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: insets.bottom + Units.s20,
        }}
      />
    </Container>
  );
};

export default App;
