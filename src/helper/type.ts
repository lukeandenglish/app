import {TextInput, ScrollView} from 'react-native';

export type refTimerType = ReturnType<typeof setTimeout> | null;

export type refTextInput = TextInput | null;
export type refScrollView = React.MutableRefObject<ScrollView> | null;
