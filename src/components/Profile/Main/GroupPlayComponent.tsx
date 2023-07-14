import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {card, create, profile} from '../../../assets/svg/bottom-tabs';
import ROUTER_PAGE from '../../../config/page';
import {Inset} from '../../../styleApp/Spacing';
import {Styles} from '../../../styleApp/Styles';
import {FontFamily, Typography} from '../../../styleApp/Typografy';
import {Units, isCalcSize} from '../../../styleApp/Units';
import colors from '../../../styleApp/colors';

export const GroupPlayComponent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handlePageNavigate = () => {
    navigation.navigate(ROUTER_PAGE.TAB.Settings);
  };

  const handlePageSearchNavigate = () => {
    navigation.navigate(ROUTER_PAGE.AUTH.ProfileSearchCard);
  };

  const handlePageMainNavigate = () => {
    navigation.navigate(ROUTER_PAGE.AUTH.ProfileMain);
  };

  return (
    <>
      <View style={styles.gpcw}>
        <View
          style={[
            styles.rowbtn,
            {
              paddingBottom: insets.bottom,
            },
          ]}>
          <Inset
            vertical="s14"
            layout={StyleSheet.flatten({
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-around',
            })}>
            <TouchableOpacity
              style={[Styles.flex1, styles.btnT]}
              onPress={handlePageSearchNavigate}>
              <SvgXml xml={card} />
              <Text
                style={[
                  styles.btntxt,
                  Typography.text12,
                  FontFamily[400],
                  {color: colors.gray_350},
                ]}>
                {t`Подборки`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.flex1, styles.btnT]}
              onPress={handlePageMainNavigate}>
              <SvgXml xml={create} />
              <Text
                style={[
                  styles.btntxt,
                  Typography.text12,
                  FontFamily[400],
                  {color: '#E2F601'},
                ]}>{t`Учить`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePageNavigate}
              style={[Styles.flex1, styles.btnT]}>
              <SvgXml xml={profile} />
              <Text
                style={[
                  styles.btntxt,
                  Typography.text12,
                  FontFamily[400],
                  {color: colors.gray_350},
                ]}>
                {t`Профиль`}
              </Text>
            </TouchableOpacity>
          </Inset>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rowbtn: {
    flexDirection: 'row',
    backgroundColor: colors.lightInk,
  },
  btntxt: {
    textAlign: 'center',
    color: colors.gray_100,
    alignItems: 'center',
  },
  btnT: {
    alignItems: 'center',
    minWidth: '30%',
  },
  gpcwbl: {
    height: isCalcSize(48),
    justifyContent: 'center',
    width: isCalcSize(48),
    borderRadius: Units.s8,
  },
  gpcw: {
    position: 'absolute',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.10)',
    backgroundColor: colors.lightPrimary,
    left: 0,
    right: 0,
    bottom: -10,
  },
});
