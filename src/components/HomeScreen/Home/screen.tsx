/* eslint-disable react-native/no-inline-styles */
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {
  Dimensions,
  ListRenderItemInfo,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import * as R from 'ramda';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {registerCallbackEndpoints} from '../../../api/store';
import {deckCard} from '../../../redux/api/deckCard';
import {Inset} from '../../../styleApp/Spacing';
import {FontFamily, Typography} from '../../../styleApp/Typografy';
import {LabelText} from '../../../styleApp/UI/LabelText';
import colors from '../../../styleApp/colors';
import {Card, getCurrentMode, getCurrentScene} from './Card';
import {Container} from './Container';
import {AnimatedViewBlock} from '../../../styleApp/animate/AnimatedViewBlock';
import {Units} from '../../../styleApp/Units';
import {iListDeckCatalog, iListItem} from '../../../redux/api/deckCard/helper';

export const WIDTH = Dimensions.get('screen').width;

const initialData = {data: [], refresh: true, error: null};
const actionLocalInit = 'ACTION_LOCAL_INIT';
const actionLocalError = 'ACTION_LOCAL_ERROR';
const actionLocalRefresh = 'ACTION_LOCAL_REFRESH';
const actionLocalTouchError = 'ACTION_LOCAL_TOUCH_ERROR';

const ListEmptyDeck = () => {
  return <View style={{flex: 1, backgroundColor: colors.greenyellow}} />;
};

const App = () => {
  const insets = useSafeAreaInsets();
  const sectionListRef = React.useRef<SectionList | null>(null);
  const dispatch = useDispatch();
  const [{data, refresh, error}, dispatchLocal] = React.useReducer(
    (state = initialData, action) => {
      switch (action.type) {
        case actionLocalInit:
          return action.payload;
        case actionLocalError:
          state.error = action.payload;
          return state;
        case actionLocalTouchError:
          state.error = null;
          return state;
        case actionLocalRefresh:
          state.refresh = true;
          return state;
        default:
          return state;
      }
    },
    initialData,
  );

  const dataLength = data.length - 1;

  useFocusEffect(
    React.useCallback(() => {
      onSendRequest({})(actionLocalInit);
    }, []),
  );

  // const onRefresh = React.useCallback(() => {
  //   dispatchLocal({type: actionLocalRefresh});
  //   onSendRequest({})(actionLocalInit);
  // }, []);

  const onSendRequest =
    (args = {}) =>
    type => {
      registerCallbackEndpoints({
        endpoints: deckCard.endpoints.deckCardHome,
        args,
        dispatch,
      })
        .then(payload => dispatchLocal({type, payload}))
        .catch(payload =>
          dispatchLocal({type: actionLocalError, payload: [payload].join('')}),
        );
    };

  const renderItem = React.useCallback(
    (render: ListRenderItemInfo<iListDeckCatalog[]>) => {
      return (
        <View
          style={{
            flex: 1,
            minHeight: 2,
            paddingHorizontal: render?.item?.[0]?.scene ? Units.s14 : Units.s4,
          }}>
          <FlashList
            horizontal
            estimatedItemSize={WIDTH}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: colors.lightPrimary,
            }}
            renderItem={(
              props: ListRenderItemInfo<iListDeckCatalog | null | undefined>,
            ) => {
              return (
                <View style={{flex: 1, minHeight: 2}}>
                  <Card
                    mode={getCurrentMode(props)}
                    scene={getCurrentScene(props)}
                    title={R.path<iListItem['title']>(['item', 'title'])(props)}
                    cardLength={R.path<iListItem['cardLength']>([
                      'item',
                      'cardLength',
                    ])(props)}
                  />
                </View>
              );
            }}
            getItemType={() => {
              return Math.random().toString();
            }}
            data={render.item}
          />
        </View>
      );
    },
    [],
  );

  const onChangeList = React.useCallback(
    (idx: number) => () => {
      if (R.equals(dataLength, idx)) {
        sectionListRef.current?.scrollToLocation({
          sectionIndex: dataLength,
          itemIndex: 1,
        });
        return;
      }
      sectionListRef.current?.scrollToLocation({
        sectionIndex: idx,
        itemIndex: 1,
      });
    },
    [dataLength],
  );

  return (
    <Container background={dataLength !== 0 ? null : colors.greenyellow}>
      <SectionList
        ref={sectionListRef}
        sections={data}
        extraData={data}
        bounces={false}
        ListEmptyComponent={ListEmptyDeck}
        keyExtractor={(item, index) => [item, index].join('_')}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom,
          backgroundColor: colors.lightPrimary,
        }}
        renderSectionHeader={({section: {title, idx}}) => (
          <Inset
            horizontal="s16"
            bottom="s6"
            top="s12"
            layout={StyleSheet.flatten({
              backgroundColor: colors.lightPrimary,
            })}>
            <TouchableOpacity onPress={onChangeList(idx)}>
              <LabelText
                title={title}
                style={Object.assign([
                  Typography.text38,
                  styles.header,
                  FontFamily.wermut,
                ])}
              />
            </TouchableOpacity>
          </Inset>
        )}
      />
      {error && (
        <AnimatedViewBlock>
          <TouchableOpacity
            onPress={() => dispatchLocal({type: actionLocalTouchError})}>
            <LabelText
              title="Slava error fix me"
              style={Object.assign([
                FontFamily.wermut,
                Typography.text10,
                styles.errorText,
              ])}
            />
          </TouchableOpacity>
        </AnimatedViewBlock>
      )}
    </Container>
  );
};

export default App;

const styles = StyleSheet.create({
  errorText: {color: colors.bodyText, backgroundColor: colors.additional},
  header: {
    textAlign: 'left',
    letterSpacing: 1.2,
    color: colors.lightInk,
    fontWeight: '300',
  },
});
