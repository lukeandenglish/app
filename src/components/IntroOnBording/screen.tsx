/* eslint-disable react-hooks/exhaustive-deps */
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import lodash from 'lodash';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {
  FadeOutDown,
  Layout as RNRLayout,
  ZoomInUp,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {PalletColor, one, three, two} from '../../assets/info';
import ROUTER_PAGE from '../../config/page';
import {Layout} from '../../styleApp/Layout';
import {Inset, Queue, Stack} from '../../styleApp/Spacing';
import {FontFamily} from '../../styleApp/Typografy';
import {Button} from '../../styleApp/UI/Button';
import {LabelText} from '../../styleApp/UI/LabelText';
import {Border, FontSize, Units, isCalcSize} from '../../styleApp/Units';
import colors from '../../styleApp/colors';

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
        x: numberIdx === DATA.length ? 0 : numberIdx * Layout.window.width,
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

  const selectNavigate = () => {
    navigation.navigate(ROUTER_PAGE.UNAUTH.LogInOrRegister);
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrolView,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        styles.scrollView,
      ]}>
      <Inset
        vertical="s16"
        layout={StyleSheet.flatten({minHeight: isCalcSize(550)})}>
        <ScrollView
          ref={scrollRef}
          pagingEnabled
          horizontal
          enabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontScroll}>
          {DATA.map((x, idx) => (
            <Inset key={[idx, x.color].join('_')} horizontal="s16">
              <Animated.View
                entering={ZoomInUp}
                exiting={FadeOutDown}
                layout={RNRLayout.duration(1400).delay(1400)}>
                <View
                  style={[
                    styles.revolutinaryWayOfLearningEParent,
                    styles.blockStyle,
                    {backgroundColor: x.color, justifyContent: 'space-between'},
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
              </Animated.View>
            </Inset>
          ))}
        </ScrollView>
      </Inset>
      <Stack size="s16" />
      <View style={styles.spaceAround}>
        <View style={styles.blockSelect}>
          <Queue size="s16" />
          {DATA.map((x, idx) => (
            <View key={[idx, 'dots'].join('')} style={styles.row}>
              <TouchableOpacity
                onPress={() => switchCard(idx)}
                style={[styles.dot, state === idx && styles.selectDots]}
              />
              <Queue size="s16" />
            </View>
          ))}
        </View>
        <Stack size="s32" />
        <Inset horizontal="s16" vertical="s16">
          <Button
            disabled={false}
            onPress={selectNavigate}
            title={t`Log in or register`}
            styleText={{color: colors.lightPrimary}}
            style={{backgroundColor: colors.lightInk}}
          />
          <Stack size="s16" />
          <Button
            disabled={false}
            onPress={selectNavigate}
            title={t`Let’s go`}
            styleText={{color: colors.lightPrimary}}
            style={{backgroundColor: colors.actionColor}}
          />
        </Inset>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.lightPrimary,
    flexGrow: 1,
  },
  row: {flexDirection: 'row'},
  selectDots: {backgroundColor: colors.lightInk},
  blockSelect: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  blockStyle: {
    height: '100%',
    width: Layout.window.width - 2 * Units.s16,
  },
  horizontScroll: {
    position: 'relative',
    height: isCalcSize(521),
    flexGrow: 1,
    paddingBottom: 0,
  },
  scrolView: {
    backgroundColor: colors.lightPrimary,
    maxHeight: Layout.window.height,
  },
  dot: {
    height: Units.s12,
    width: Units.s12,
    borderRadius: isCalcSize(50),
    backgroundColor: colors.dot,
  },
  withTheHelpClr: {
    color: colors.lightInk,
    textAlign: 'center',
  },
  revolutinaryWayOf: {
    fontSize: FontSize.heading1_size,
    lineHeight: isCalcSize(40),
    width: isCalcSize(295),
  },
  illusrt8: {
    width: isCalcSize(220),
    height: isCalcSize(220),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    mixBlendMode: 'overlay',
  },
  withTheHelp: {
    lineHeight: isCalcSize(22),
    width: isCalcSize(279),
    marginTop: Units.s44,
    fontSize: FontSize.subheading3_size,
    color: colors.lightInk,
  },
  revolutinaryWayOfLearningEParent: {
    borderRadius: Border.br_base,
    backgroundColor: colors.lavender,
    padding: Units.p_5xl,
    alignItems: 'center',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
});

export default IntroAndOnboarding;
