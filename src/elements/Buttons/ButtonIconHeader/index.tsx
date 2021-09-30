import React, { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity, Image, ViewStyle } from "react-native";
import { Colors } from "configs";
import Theme from "style/Theme";
import { useNavigation } from "@react-navigation/native";
import { ICON } from "images/Icon";
import { themes, useTheme } from "configs/Theme";

interface ButtonIconHeaderProps {
  onPress?: () => void;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  icon?: string;
  tintColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  style?: ViewStyle;
}

const ButtonIconHeader = memo(
  ({
    onPress,
    style,
    marginLeft,
    marginRight,
    marginBottom,
    borderColor,
    backgroundColor,
    icon,
    tintColor,
  }: ButtonIconHeaderProps) => {
    const { goBack } = useNavigation();
    const _onPress = useCallback(() => {
      if (onPress) {
        onPress();
      } else {
        goBack();
      }
    }, [onPress]);
    const { theme } = useTheme();
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          {
            marginLeft: marginLeft ? marginLeft : 0,
            marginBottom: marginBottom ? marginBottom : 0,
            marginRight: marginRight ? marginRight : 0,
            borderColor: borderColor || Colors.Platinum,
            backgroundColor: backgroundColor
              ? backgroundColor
              : theme.backgroundItem,
          },
        ]}
        onPress={_onPress}
      >
        <Image
          source={ICON[`${icon}`] || ICON.back}
          style={{ tintColor: tintColor ? tintColor : theme.tintColor }}
        />
      </TouchableOpacity>
    );
  }
);

export default ButtonIconHeader;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    ...Theme.center,
    marginBottom: 16,
  },
});
