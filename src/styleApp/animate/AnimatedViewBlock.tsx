import React from 'react';
import {View} from 'react-native';
import Animated, {FadeOutDown, Layout, ZoomIn} from 'react-native-reanimated';

export const AnimatedViewBlock = React.memo(props => {
  const [state, setState] = React.useState(false);
  React.useEffect(() => {
    setState(true);
    return () => setState(false);
  }, []);

  if (!state) {
    return <View />;
  }

  return (
    <Animated.View
      entering={ZoomIn}
      exiting={FadeOutDown}
      layout={Layout.duration(400).delay(400)}>
      {props.children}
    </Animated.View>
  );
});
