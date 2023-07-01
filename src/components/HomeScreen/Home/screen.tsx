/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, SectionList, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container} from '../../../styleApp/UI/Container';
import colors from '../../../styleApp/colors';
import {GroupPlayComponent} from './Component/GroupPlayComponent';
import {useGetCurrentStack} from './hooks';
import {renderItem} from './renderItem';
import {Units, isCalcSize} from '../../../styleApp/Units';

export const WIDTH = Dimensions.get('screen').width;

const App = () => {
  const insets = useSafeAreaInsets();
  const sectionListRef = React.useRef<SectionList | null>(null);
  const [data] = useGetCurrentStack();

  return (
    <Container notPaddingTop={false} background={colors.lightPrimary}>
      <SectionList
        ref={sectionListRef}
        sections={data as any[]}
        extraData={data}
        bounces={false}
        keyExtractor={(item, index) => [item, index].join('_')}
        renderItem={renderItem}
        contentContainerStyle={{
          backgroundColor: colors.lightPrimary,
          paddingBottom: insets.bottom + Units.s20,
        }}
      />
      <View style={{height: isCalcSize(140) + insets.bottom}} />
      <GroupPlayComponent />
    </Container>
  );
};

export default App;
