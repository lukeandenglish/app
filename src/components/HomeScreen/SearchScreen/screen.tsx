/* eslint-disable react-native/no-inline-styles */
import * as R from 'ramda';
import React from 'react';
import {Dimensions, SectionList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container} from '../../../styleApp/UI/Container';
import {Units} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';
import {GroupPlayComponent} from './Component/GroupPlayComponent';
import {useGetCurrentStack} from './hooks';
import {renderItem} from './renderItem';

export const WIDTH = Dimensions.get('screen').width;

const App = () => {
  const insets = useSafeAreaInsets();
  const sectionListRef = React.useRef<SectionList | null>(null);
  const [data] = useGetCurrentStack();

  return (
    <Container notPaddingTop={true} background={colors.lightPrimary}>
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
      <GroupPlayComponent
        isEmpty={R.pipe(R.path([0, 'data', 0, 'data']), R.isEmpty)(data)}
      />
    </Container>
  );
};

export default App;
