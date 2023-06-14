import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Inset } from 'react-native-spacing-system';
import { Queue, Stack } from '../../styleApp/Spacing';
import { FontFamily, Typography } from '../../styleApp/Typografy';
import { LabelText } from '../../styleApp/UI/LabelText';
import { Units } from '../../styleApp/Units';
import colors from '../../styleApp/colors';
import { DATA } from './screen';

export const FlatListStick = ({ state }) => {
    return (
        <FlatList
            renderItem={props => (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        borderRadius: Units.s36,
                        marginVertical: Units.s2,
                        backgroundColor: colors.lightPrimary,
                    }}>
                    <Inset horizontal={Units.s20} vertical={Units.s20}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={[{ width: Units.s18, height: Units.s18, borderWidth: 1 }]} />
                            <Queue size="s10" />
                            <LabelText
                                title={props.item.title}
                                style={Object.assign([
                                    FontFamily[300],
                                    Typography.text16,
                                    { color: colors.lightInk, textAlign: 'left', flex: 1 },
                                ])} />
                            <Queue size="s10" />
                            <View
                                style={[{ width: Units.s18, height: Units.s18, borderWidth: 1 }]} />
                        </View>
                    </Inset>
                </TouchableOpacity>
            )}
            ListHeaderComponent={() => (
                <View style={{ width: '100%' }}>
                    <LabelText
                        title={DATA[state]?.title}
                        style={Object.assign([
                            FontFamily[400],
                            Typography.text38,
                            { color: colors.lightInk, textAlign: 'center', flex: 1 },
                        ])} />
                    <Stack size="s10" />
                    <LabelText
                        title={DATA[state]?.desc}
                        style={Object.assign([
                            FontFamily[300],
                            Typography.text16,
                            { color: colors.lightInk, textAlign: 'center', flex: 1 },
                        ])} />
                    <Stack size="s20" />
                </View>
            )}
            data={DATA[state]?.value} />
    );
};
