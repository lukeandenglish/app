import {t} from '@lingui/macro';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {iconlogo, nexthomeicon} from '../../assets/close';
import {TextAddedComp} from '../../modal/TextAddedComp';
import {Layout} from '../../styleApp/Layout';
import {Queue, Stack} from '../../styleApp/Spacing';
import {Border, FontSize, Units, isCalcSize} from '../../styleApp/Units';
import colors from '../../styleApp/colors';

const IntroAndOnboarding = () => {
  const insets = useSafeAreaInsets();
  const [state, setState] = React.useState<number>(0);

  const TITLE = [
    {
      title: t`Давайте-ка познакомимся получше и найдем слепые пятна в вашем английском.`,
      size: 's64',
    },
    {
      title: t`Но сначала мне нужно немного узнать о тебе, чтобы я мог заполнить твои самые большие "слепые зоны" в английском.`,
      size: 's16',
    },
    {
      title: t`Я задам несколько вопросов, а вы отвечайте честно.`,
      size: 's86',
    },
    {
      title: t`Так мы сможем сделать ваше обучение максимально эффективным.`,
      size: 's64',
    },
    {
      title: t`Располагайтесь, наливайте бокальчик, зажигайте ароматическую свечу и… Поехали!`,
      size: 's40',
    },
  ] as {title: string; size: string}[];

  const current = TITLE[state];

  const handlePressStart = () => {
    if (state === 4) {
      return;
    }
    setState(state + 1);
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
      <View style={styles.logoIcon}>
        <Stack size="s8" />
        <SvgXml xml={iconlogo} />
      </View>
      <Stack size={current.size} />
      <TextAddedComp title={current.title} />
      <View style={styles.btnstyle}>
        <View style={styles.rowC}>
          <Queue size="s20" />
          <View
            onTouchStart={() => setState(0)}
            style={[styles.select, state === 0 && styles.selectActive]}
          />
          <Queue size="s12" />
          <View
            onTouchStart={() => setState(1)}
            style={[styles.select, state === 1 && styles.selectActive]}
          />
          <Queue size="s12" />
          <View
            onTouchStart={() => setState(2)}
            style={[styles.select, state === 2 && styles.selectActive]}
          />
          <Queue size="s12" />
          <View
            onTouchStart={() => setState(3)}
            style={[styles.select, state === 3 && styles.selectActive]}
          />
          <Queue size="s12" />
          <View
            onTouchStart={() => setState(4)}
            style={[styles.select, state === 4 && styles.selectActive]}
          />
        </View>

        <View style={styles.rowC}>
          <View onTouchStart={handlePressStart} style={styles.styleSelect}>
            <SvgXml xml={nexthomeicon} />
          </View>
          <Queue size="s20" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '10%',
    left: 0,
    right: 0,
  },
  logoIcon: {alignItems: 'center', justifyContent: 'center'},
  selectActive: {
    width: 45,
    backgroundColor: colors.lemon,
    borderWidth: 4,
  },
  rowC: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLine: {flexDirection: 'row'},
  styleSelect: {
    width: Units.s64,
    height: Units.s64,
    borderRadius: Units.s50,
    backgroundColor: colors.lightInk,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    width: Units.s20,
    height: Units.s20,
    backgroundColor: colors.lightInk,
    borderRadius: Units.s50,
  },
  scrollView: {
    backgroundColor: colors.oldlace,
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
