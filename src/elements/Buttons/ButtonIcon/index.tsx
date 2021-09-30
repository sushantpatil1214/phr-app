import React, { memo, useCallback } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
  ColorValue,
} from "react-native";
import { Colors } from "configs";
import Theme from "style/Theme";
import { ICON } from "images/Icon";
import { themes, useTheme } from "configs/Theme";

interface ButtonIconProps {
  icon?: any;
  style?: ViewStyle;
  iconStyle?: any;
  width?: number;
  height?: number;
  marginRight?: number;
  backgroundColor?: ColorValue | string;
  tintColor?: string | ColorValue;
  marginLeft?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  layout?: boolean;
  borderColor?: string;
  borderRadius?: number;
  disabled?: boolean;
  onPress?: () => void;
}

const ButtonIcon = memo(
  ({
    icon,
    backgroundColor = Colors.DodgerBlue,
    tintColor,
    marginRight,
    marginLeft,
    marginHorizontal,
    marginVertical,
    borderColor,
    borderRadius = 16,
    height = 32,
    width = 32,
    style,
    iconStyle,
    onPress,
    layout,
    disabled,
    ...props
  }: ButtonIconProps) => {
    const _onPress = useCallback(() => {
      onPress && onPress();
    }, [onPress]);
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.54}
        style={[
          styles.container,
          {
            backgroundColor: disabled
              ? Colors.Platinum
              : layout
              ? theme.backgroundItem
              : backgroundColor,
            marginRight: marginRight,
            marginLeft: marginLeft,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            borderColor: borderColor
              ? borderColor
              : disabled
              ? Colors.Platinum
              : backgroundColor,
            borderWidth: 1,
            borderRadius: borderRadius,
            height: height,
            width: width,
          },
          style,
        ]}
        disabled={disabled}
        onPress={_onPress}
      >
        <Image
          style={iconStyle}
          source={ICON[`${icon}`]}
          tintColor={tintColor}
        />
      </TouchableOpacity>
    );
  }
);

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    ...Theme.center,
  },
});
