import * as React from 'react';
import {Button} from '../../styleApp/UI/Button';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Border, FontSize, Units} from '../../styleApp/Units';
import {default as Color, default as colors} from '../../styleApp/colors';
import {t} from '@lingui/macro';
import {ScrollView} from 'react-native-gesture-handler';
import {Inset, Queue, Stack} from '../../styleApp/Spacing';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RV} from '../../styleApp/Utils';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import ROUTER_PAGE from '../../config/page';
import {LabelText} from '../../styleApp/UI/LabelText';

const WIDTH = Dimensions.get('screen').width;
const TIMER = 2500;

const DATA = [
  {
    title: t`Revolutinary way of learning English`,
    value: t`With the help of interval trainings that you design by yourself`,
    icon: '',
    color: Color.lavender,
  },
  {
    title: t`Revolutinary way of learning English`,
    value: t`With the help of interval trainings that you design by yourself`,
    icon: '',
    color: Color.coral,
  },
  {
    title: t`Revolutinary way of learning English`,
    value: t`With the help of interval trainings that you design by yourself`,
    icon: '',
    color: Color.additional,
  },
  {
    title: t`Revolutinary way of learning English`,
    value: t`With the help of interval trainings that you design by yourself`,
    icon: '',
    color: Color.sucess,
  },
];

const IntroAndOnboarding = () => {
  const insets = useSafeAreaInsets();
  const scrollRef = React.useRef<ScrollView | null>(null);
  const refTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = React.useState<number>(0);
  const navigation = useNavigation();

  const switchCard = (numberIdx: number) => {
    setState(numberIdx === DATA.length ? 0 : numberIdx);
    scrollRef.current?.scrollTo({
      x: numberIdx === DATA.length ? 0 : numberIdx * WIDTH,
      y: 0,
      animated: true,
    });
  };

  React.useLayoutEffect(() => {
    refTimer.current && clearTimeout(refTimer.current);
    refTimer.current = setTimeout(() => {
      const numberIdx = state + 1;
      switchCard(numberIdx);
    }, TIMER);
    return () => {
      refTimer.current && clearTimeout(refTimer.current);
    };
  }, [state]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrolView,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
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
                ,
              ]}>
              <LabelText
                title={x.title}
                style={Object.assign([
                  styles.revolutinaryWayOf,
                  styles.withTheHelpClr,
                ])}
              />
              <View style={styles.illusrt8}>
                {/* <View
      style={styles.a73831e008630db8fbacaed58e1945Icon}
      // contentFit="cover"
      // source={require('../assets/a73831e008630db8fbacaed58e19453f.png')}
    /> */}
              </View>
              <LabelText
                title={x.value}
                style={Object.assign([
                  styles.withTheHelp,
                  styles.withTheHelpClr,
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
    height: 12,
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
    height: 12,
    width: 12,
    borderRadius: 50,
    backgroundColor: Color.dot,
  },
  withTheHelpClr: {
    color: Color.lightInk,
    textAlign: 'center',
  },
  revolutinaryWayOf: {
    fontSize: FontSize.heading1_size,
    lineHeight: 40,
    // // fontFamily: FontFamily.subHeading,
    width: RV(295),
  },
  illusrt8: {
    width: RV(220),
    height: RV(211),
    overflow: 'hidden',
  },
  withTheHelp: {
    lineHeight: 22,
    // // fontFamily: FontFamily.graphikRegular,
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
