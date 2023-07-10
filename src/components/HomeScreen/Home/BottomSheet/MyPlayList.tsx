import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {registerCallbackEndpoints} from '../../../../api/registerCallbackEndpoints';
import {playSvg} from '../../../../assets/close';
import {reverseSvg} from '../../../../assets/collection';
import {homeApi} from '../../../../redux/api/homeCard';
import {Inset, Stack} from '../../../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../../../styleApp/Typografy';
import {Units, isCalcSize} from '../../../../styleApp/Units';
import colors from '../../../../styleApp/colors';
import * as R from 'ramda';
import ROUTER_PAGE from '../../../../config/page';

export const ItemSeparator = () => {
  return (
    <>
      <Stack size="s16" />
      <View style={styles.sbw} />
      <Stack size="s16" />
    </>
  );
};

export const HeaderCardRenderItem = () => {
  return (
    <View style={Styles.flex1}>
      <Text
        style={[Typography.text24, FontFamily.wermut]}>{t`Выберите стэк`}</Text>
      <Stack size="s24" />
    </View>
  );
};

export const SelectCardRenderItem = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleOnPress = () => {
    if (R.path<string>(['item', 'id'])(props)) {
      registerCallbackEndpoints({
        endpoints: homeApi.endpoints.currentStack,
        dispatch,
        args: {stackId: R.path<string>(['item', 'id'])(props)},
      }).then(data => {
        navigation.navigate(ROUTER_PAGE.AUTH.ProfileUserCard, data);
        props?.onClose();
      });
    }
  };
  return (
    <View style={styles.rwbctx}>
      <View
        style={[
          styles.rbctx,
          {
            backgroundColor: props?.item?.color,
          },
        ]}>
        <Image source={{uri: props.item?.photo?.url}} style={{flex: 1}} />
      </View>
      <Inset left="s14" right="s20" layout={StyleSheet.flatten({flex: 1})}>
        <Text style={[Typography.text18, FontFamily['600']]}>
          {props.item?.title}
        </Text>
        <Stack size="s8" />
        <Text style={[Typography.text12, FontFamily['400']]}>
          {props.item?.description}
        </Text>
      </Inset>
      <TouchableOpacity onPress={handleOnPress}>
        <SvgXml
          width={isCalcSize(36)}
          height={isCalcSize(36)}
          xml={props.index === 0 ? reverseSvg() : playSvg()}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sbw: {borderBottomWidth: 1, borderColor: colors.gray_200},
  rwbctx: {flexDirection: 'row', alignItems: 'center', flex: 1},
  rbctx: {
    justifyContent: 'center',
    width: isCalcSize(82),
    height: isCalcSize(82),
    borderRadius: Units.s8,
  },
});
