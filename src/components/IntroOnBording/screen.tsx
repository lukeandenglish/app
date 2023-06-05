/* eslint-disable react-hooks/exhaustive-deps */
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import lodash from 'lodash';
import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {PalletColor, one, three, two} from '../../assets/info';
import ROUTER_PAGE from '../../config/page';
import {Inset, Queue, Stack} from '../../styleApp/Spacing';
import {FontFamily} from '../../styleApp/Typografy';
import {Button} from '../../styleApp/UI/Button';
import {LabelText} from '../../styleApp/UI/LabelText';
import {Border, FontSize, Units} from '../../styleApp/Units';
import {RV} from '../../styleApp/Utils';
import {default as Color, default as colors} from '../../styleApp/colors';

const WIDTH = Dimensions.get('screen').width;
const TIMER = 2500;

const IntroAndOnboarding = () => {
  const insets = useSafeAreaInsets();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const refTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = React.useState<number>(0);
  const navigation = useNavigation();
  const svg = [one, two, three] as string[];

  const DATA = React.useMemo(() => {
    const count = lodash.random(0, svg.length - 1);
    const pallet = lodash.random(0, PalletColor.length - 1);
    return [
      {
        title: t`Revolutinary way of learning English`,
        value: t`With the help of interval trainings that you design by yourself`,
        icon: svg[count],
        color: PalletColor[pallet],
      },
      {
        title: t`Revolutinary way of learning English`,
        value: t`With the help of interval trainings that you design by yourself`,
        icon: svg[count],
        color: PalletColor[pallet],
      },
      {
        title: t`Revolutinary way of learning English`,
        value: t`With the help of interval trainings that you design by yourself`,
        icon: svg[count],
        color: PalletColor[pallet],
      },
      {
        title: t`Revolutinary way of learning English`,
        value: t`With the help of interval trainings that you design by yourself`,
        icon: svg[count],
        color: PalletColor[pallet],
      },
    ];
  }, [svg]);

  const switchCard = React.useCallback(
    (numberIdx: number) => {
      setState(numberIdx === DATA.length ? 0 : numberIdx);
      scrollRef.current?.scrollTo({
        x: numberIdx === DATA.length ? 0 : numberIdx * WIDTH,
        y: 0,
        animated: true,
      });
    },
    [DATA.length],
  );

  React.useLayoutEffect(() => {
    refTimer.current && clearTimeout(refTimer.current);
    refTimer.current = setTimeout(() => {
      const numberIdx = state + 1;
      switchCard(numberIdx);
    }, TIMER);
    return () => {
      refTimer.current && clearTimeout(refTimer.current);
    };
  }, [state, switchCard]);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrolView,
        {
          paddingTop: RV(insets.top),
          paddingBottom: RV(insets.bottom + 50),
          backgroundColor: colors.lightPrimary,
        },
      ]}>
      <Stack size="s40" />
      <ScrollView
        ref={scrollRef}
        pagingEnabled
        horizontal
        enabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontScroll}>
        {DATA.map((x, idx) => (
          <Inset key={[idx, x.color].join('_')} horizontal="s16">
            <View
              style={[
                styles.revolutinaryWayOfLearningEParent,
                styles.blockStyle,
                {backgroundColor: x.color},
              ]}>
              <LabelText
                title={x.title}
                style={Object.assign([
                  styles.revolutinaryWayOf,
                  styles.withTheHelpClr,
                ])}
              />
              <View style={styles.illusrt8}>
                <SvgXml xml={x.icon} />
              </View>
              <LabelText
                title={x.value}
                style={Object.assign([
                  styles.withTheHelp,
                  styles.withTheHelpClr,
                  FontFamily['300'],
                ])}
              />
            </View>
          </Inset>
        ))}
      </ScrollView>
      <Stack size="s30" />
      <View style={styles.blockSelect}>
        <Queue size="s16" />
        {DATA.map((x, idx) => (
          <View key={[idx, 'dots'].join('')} style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => switchCard(idx)}
              style={[
                styles.dot,
                state === idx && {backgroundColor: Color.lightInk},
              ]}
            />
            <Queue size="s16" />
          </View>
        ))}
      </View>
      <Stack size="s52" />
      <Inset horizontal="s16">
        <Button
          disabled={false}
          onPress={() =>
            navigation.navigate(ROUTER_PAGE.UNAUTH.LogInOrRegister)
          }
          title={t`Log in or register`}
          styleText={{color: colors.lightPrimary}}
          style={{backgroundColor: colors.lightInk}}
        />
        <Stack size="s16" />
        <Button
          disabled={false}
          onPress={() =>
            navigation.navigate(ROUTER_PAGE.UNAUTH.LogInOrRegister)
          }
          title={t`Let’s go`}
          styleText={{color: colors.lightPrimary}}
          style={{backgroundColor: colors.actionColor}}
        />
      </Inset>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blockSelect: {
    height: RV(12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  blockStyle: {
    height: '100%',
    width: WIDTH - 2 * Units.s16,
  },
  horizontScroll: {
    position: 'relative',
    height: RV(511),
    paddingBottom: 0,
  },
  scrolView: {
    flexGrow: 1,
    backgroundColor: colors.transparent,
  },
  dot: {
    height: RV(12),
    width: RV(12),
    borderRadius: RV(50),
    backgroundColor: Color.dot,
  },
  withTheHelpClr: {
    color: Color.lightInk,
    textAlign: 'center',
  },
  revolutinaryWayOf: {
    fontSize: FontSize.heading1_size,
    lineHeight: RV(40),
    width: RV(295),
  },
  illusrt8: {
    width: RV(220),
    height: RV(220),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    mixBlendMode: 'overlay',
  },
  withTheHelp: {
    lineHeight: RV(22),
    width: RV(279),
    marginTop: Units.s44,
    fontSize: FontSize.subheading3_size,
    color: Color.lightInk,
  },
  revolutinaryWayOfLearningEParent: {
    borderRadius: Border.br_base,
    backgroundColor: Color.lavender,
    padding: Units.p_5xl,
    alignItems: 'center',
  },
});

export default IntroAndOnboarding;
