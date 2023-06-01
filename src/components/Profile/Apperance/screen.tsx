import {t} from '@lingui/macro';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {Select} from '../../../assets/svg/switch';
import {Inset} from '../../../styleApp/Spacing';
import {LabelText} from '../../../styleApp/UI/LabelText';
import colors from '../../../styleApp/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  IUserProfile,
  actionChangeApperance,
} from '../../../redux/action/register';
import REDUCER_PATH from '../../../config/reducer';
import * as R from 'ramda';

export default (): React.ReactNode => {
  const insets = useSafeAreaInsets();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const dispatch = useDispatch();
  const [apperance] = useSelector(
    R.pipe(R.path([REDUCER_PATH.USER]), R.paths([['apperance']])),
  ) as [IUserProfile['apperance']];

  const SECONDARY = [
    {
      title: t`Light`,
      value: null,
      onPress: () => dispatch(actionChangeApperance(0)),
      svg: apperance,
    },
    {
      title: t`Dark`,
      value: null,
      onPress: () => dispatch(actionChangeApperance(1)),
      svg: apperance,
    },
    {
      title: t`System`,
      value: null,
      onPress: () => dispatch(actionChangeApperance(2)),
      svg: apperance,
    },
  ];

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
        <Inset horizontal="s16">
          {SECONDARY.map((item, index) => (
            <TouchableOpacity
              key={[index, 'first'].join('_')}
              disabled={index === apperance}
              onPress={item.onPress}>
              <Inset
                vertical="s16"
                layout={StyleSheet.flatten([
                  styles.itemBlock,
                  item.noBottom && {borderBottomWidth: 0},
                ])}>
                <View style={styles.row}>
                  <View style={{flex: 1}}>
                    <LabelText mode="desc" title={item.title} />
                    {item.value && (
                      <LabelText mode="notify" title={item.value} />
                    )}
                  </View>
                </View>
                <TouchableOpacity style={styles.borderIcon}>
                  {index === apperance && <SvgXml xml={Select} />}
                </TouchableOpacity>
              </Inset>
            </TouchableOpacity>
          ))}
        </Inset>
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
