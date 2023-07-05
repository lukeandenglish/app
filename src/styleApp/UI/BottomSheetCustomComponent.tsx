/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sparse-arrays */
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import * as R from 'ramda';
import React from 'react';
import {Keyboard} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {refTimerType} from '../../helper/type';
import {useLandscape} from '../../hooks/useOrientation';
import {Layout as WLayout} from '../Layout';
import {isCalcSize} from '../Units';
import colors from '../colors';

export const BottomSheetCustomComponent = React.forwardRef(
  (
    {
      children,
      mode,
      handleSheetChanges,
      style,
    }: {
      children: React.ReactNode;
      withoutKeyboard?: boolean;
      mode?:
        | 'lessmodal'
        | 'fullscreen'
        | 'moremedium'
        | 'mediummodal'
        | 'smallmodal'
        | 'deletemodal'
        | 'fullscreenWithout'
        | null;
      handleSheetChanges?: () => void;
    },
    ref,
  ) => {
    const [state, setState] = React.useState(false);
    const {isLandscape} = useLandscape();
    const insets = useSafeAreaInsets();
    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const refTimer = React.useRef<refTimerType>(null);
    const refCloseTimer = React.useRef<refTimerType>(null);
    const refIndex = React.useRef<number>(0);

    const snapPoints = React.useMemo(() => {
      switch (mode) {
        case 'mediummodal':
          return ['1', WLayout.window.height - 450];
        case 'lessmodal':
          return ['1', WLayout.window.height - 500];
        case 'moremedium':
          return ['1', WLayout.window.height - 400];
        case 'fullscreen':
          return ['1', WLayout.window.height];
        case 'fullscreenWithout':
          return ['1', WLayout.window.height];
        case 'smallmodal':
          return ['1', WLayout.window.height - 500];
        case 'deletemodal':
          return ['1', WLayout.window.height - 550];
        default:
          return ['1', WLayout.window.height - 500];
      }
    }, [mode]);

    React.useLayoutEffect(() => {
      if (state) {
        setTimeout(() => {
          setState(true);
          bottomSheetRef?.current?.snapToIndex(1);
        }, 1000);
      }
      bottomSheetRef?.current?.close && bottomSheetRef.current?.close();
      setState(false);
    }, [isLandscape, mode]);

    const handleOnClose = () => {
      bottomSheetRef.current?.close && bottomSheetRef.current?.close();
      refTimer.current = setTimeout(() => {
        refTimer.current && clearTimeout(refTimer.current);
        Keyboard.dismiss();
        setState(false);
      }, 100);
    };

    const handleOnOpen = (e: number) => {
      setState(true);
      refTimer.current = setTimeout(() => {
        bottomSheetRef.current?.snapToIndex &&
          bottomSheetRef.current?.snapToIndex(e ?? 1);
      }, 500);
    };

    React.useImperativeHandle(ref, () => ({
      snapToIndex: handleOnOpen,
      close: handleOnClose,
    }));

    const renderBackdrop = React.useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop {...props} />
      ),
      [],
    );

    const onChangeBottom = (e: number) => {
      if (e === 0 && refIndex.current === 1) {
        bottomSheetRef.current?.forceClose();
      }
      if (e <= 0) {
        Keyboard.dismiss();
      }
      if (e === -1) {
        refCloseTimer.current = setTimeout(() => {
          if (state && handleSheetChanges) {
            handleSheetChanges();
            console.log('bottomSheet');
          }
        }, 500);
      }
      if (e === 1) {
        refCloseTimer.current && clearTimeout(refCloseTimer.current);
      }
      refIndex.current = e;
    };

    let handleStyle = {};
    if (mode !== 'fullscreen') {
      handleStyle = {
        display: 'none',
      };
    }

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        bottomInset={0}
        animateOnMount
        enableOverDrag={true}
        handleStyle={handleStyle}
        enableHandlePanningGesture={true}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        onChange={onChangeBottom}
        style={[
          {
            marginTop: insets.top,
            marginBottom: insets.bottom,
            borderTopRightRadius: isCalcSize(16),
            borderTopLeftRadius: isCalcSize(16),
            backgroundColor: colors.transparent,
          },
          R.isEmpty(handleStyle) && {
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
          style,
          !state && {display: 'none'},
        ]}>
        {children}
      </BottomSheet>
    );
  },
);
