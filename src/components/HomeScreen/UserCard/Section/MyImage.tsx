import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {
  addedSvg,
  closeNavigateSvg,
  copySvg,
  moreSvg,
} from '../../../../assets/close';
import {ArtSvg} from '../../../../assets/collection';
import {Inset, Queue, Stack} from '../../../../styleApp/Spacing';
import {FontFamily, Styles, Typography} from '../../../../styleApp/Typografy';
import {Button} from '../../../../styleApp/UI/Button';
import {Units, isCalcSize} from '../../../../styleApp/Units';
import colors from '../../../../styleApp/colors';

export const MyImage = props => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={Styles.flex1}>
      <View
        style={[
          styles.imc,
          {
            paddingTop: insets.top,
          },
        ]}>
        <SvgXml xml={ArtSvg} width={isCalcSize(292)} height={isCalcSize(307)} />
        <View
          style={[
            styles.lab,
            {
              top: insets.top,
            },
          ]}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={Styles.iconClose}>
            <SvgXml
              xml={closeNavigateSvg}
              width={isCalcSize(24)}
              height={isCalcSize(24)}
            />
          </TouchableOpacity>
        </View>
        {route?.params?.isMy && (
          <View
            style={[
              styles.rab,
              {
                top: insets.top,
              },
            ]}>
            <TouchableOpacity style={Styles.iconClose}>
              <SvgXml
                xml={moreSvg}
                width={isCalcSize(24)}
                height={isCalcSize(24)}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Stack size="s24" />
      <Inset horizontal="s24">
        <View style={Styles.flex1}>
          <Text style={[Typography.text38, FontFamily['400']]}>
            {'Pet owner vocab'}
          </Text>
        </View>
        <Stack size="s18" />
        <View style={Styles.flex1}>
          <Text style={[Typography.text12, FontFamily['400']]}>
            {'by Luke English'}
          </Text>
        </View>
        <Stack size="s18" />
        {route?.params?.isMy === false ? (
          <View style={styles.fr}>
            <Button
              title={'В закладки'}
              styleText={Typography.text14}
              style={styles.ibt}>
              <SvgXml xml={addedSvg} />
            </Button>
            <Queue size="s12" />
            <Button
              title="Скопировать"
              styleText={Typography.text14}
              style={styles.ibt}>
              <SvgXml xml={copySvg} />
            </Button>
          </View>
        ) : (
          <View />
        )}
      </Inset>
      <Stack size="s18" />
      <Inset horizontal="s24">
        <View style={styles.bbw} />
      </Inset>
    </View>
  );
};

const styles = StyleSheet.create({
  rab: {position: 'absolute', right: 14},
  lab: {position: 'absolute', left: 14},
  imc: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bbw: {borderBottomWidth: 1},
  fr: {flexDirection: 'row'},
  ibt: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: Units.s8,
  },
});
