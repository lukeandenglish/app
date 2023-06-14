import { t } from '@lingui/macro';
import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import settings from '../../assets/svg/settings';
import { Stack } from '../../styleApp/Spacing';
import { FontFamily, Typography } from '../../styleApp/Typografy';
import { LabelText } from '../../styleApp/UI/LabelText';
import { isCalcSize } from '../../styleApp/Units';
import colors from '../../styleApp/colors';

export const Component = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LabelText
            mode="title"
            title={t`Пройдите тест
              на уровень
              английского`}
            style={Object.assign([
                Typography.text38,
                FontFamily.wermut,
                {
                    textAlign: 'center',
                    color: colors.lightInk,
                    fontWeight: '300',
                    lineHeight: isCalcSize(40),
                },
            ])} />
        <Stack size="s32" />
        <SvgXml xml={settings} width="150" height="150" />
        <Stack size="s32" />
        <LabelText
            mode="title"
            title={t`А мы посоветуем с чего начать, чтобы было интересно`}
            style={Object.assign([
                Typography.text16,
                FontFamily.wermut,
                {
                    textAlign: 'center',
                    color: colors.lightInk,
                    fontWeight: '300',
                    paddingHorizontal: isCalcSize(32),
                },
            ])} />
    </View>
);
