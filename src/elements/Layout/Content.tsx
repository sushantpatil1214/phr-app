import { useTheme } from 'configs/Theme';
import React from 'react';
import {
  ScrollView as DefaultScrollView,
  ViewStyle,
  PressableStateCallbackType,
  ScrollViewProps,
  ColorValue,
} from 'react-native';
interface Props extends ScrollViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  backgroundColor?: ColorValue | string;
}

const Content = (props: Props) => {
  const {theme} = useTheme();
  return (
    <DefaultScrollView
      bounces
      style={[
        {backgroundColor: props.backgroundColor || theme.background},
        props.style,
      ]}>
      {props.children}
    </DefaultScrollView>
  );
};
export default Content;
