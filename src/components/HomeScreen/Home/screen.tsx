import BottomSheet from '@gorhom/bottom-sheet';
import * as R from 'ramda';
import React from 'react';
import {Dimensions, SectionList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CreateCard} from '../../../modal/CreateCard';
import {BottomSheetCustomComponent} from '../../../styleApp/UI/BottomSheetCustomComponent';
import {Container} from '../../../styleApp/UI/Container';
import {Units} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';
import {GroupPlayComponent} from './Component/GroupPlayComponent';
import {useGetCurrentStack} from './hooks';
import {renderItem} from './renderItem';
import {useNavigation} from '@react-navigation/native';
import ROUTER_PAGE from '../../../config/page';
import {registerCallbackEndpoints} from '../../../api/registerCallbackEndpoints';
import {homeApi} from '../../../redux/api/homeCard';
import {useDispatch} from 'react-redux';

export const WIDTH = Dimensions.get('screen').width;

const App = () => {
  const insets = useSafeAreaInsets();
  const sectionListRef = React.useRef<SectionList | null>(null);
  let [data] = useGetCurrentStack();
  const ref = React.useRef<BottomSheet | null>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const DATA = R.assocPath([1, 'data', 0, 'onPressAdd'], () => {
    ref.current?.snapToIndex(1);
  })(data);

  return (
    <Container notPaddingTop={false} background={colors.lightPrimary}>
      <SectionList
        ref={sectionListRef}
        sections={DATA}
        extraData={DATA}
        bounces={false}
        keyExtractor={(item, index) => [item, index].join('_')}
        renderItem={renderItem}
        contentContainerStyle={{
          backgroundColor: colors.lightPrimary,
          paddingBottom: insets.bottom + Units.s20,
        }}
      />
      <GroupPlayComponent
        isEmpty={R.pipe(R.path([1, 'data', 0, 'data']), R.isEmpty)(data)}
      />
      <BottomSheetCustomComponent ref={ref} mode="fullscreenWithout">
        <CreateCard
          onClose={stackId => {
            if (stackId) {
              registerCallbackEndpoints({
                endpoints: homeApi.endpoints.currentStack,
                dispatch,
                args: {stackId},
              }).then(data => {
                navigation.navigate(ROUTER_PAGE.AUTH.ProfileCreateCard, data);
                ref.current?.close();
              });
            }
          }}
        />
      </BottomSheetCustomComponent>
    </Container>
  );
};

export default App;
