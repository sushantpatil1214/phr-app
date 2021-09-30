import React, { memo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Text from "elements/Text";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "configs/Theme";

interface IconNotificationProps {
  style?: ViewStyle;
}

const IconNotification = memo((props: IconNotificationProps) => {
  const { navigate } = useNavigation();
  const onGoToNotification = useCallback(() => {
    navigate(Routes.Notification);
  }, [navigate]);
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.style,
        { backgroundColor: theme.backgroundItem },
      ]}
      onPress={onGoToNotification}
      activeOpacity={0.54}
    >
      <View
        style={{
          paddingHorizontal: 4,
          backgroundColor: Colors.RedNeonFuchsia,
          height: 16,
          ...Theme.center,
          paddingTop: 3,
          borderRadius: 100,
          position: "absolute",
          top: -7,
          right: -7,
        }}
      >
        <Text size={11} white>
          3
        </Text>
      </View>
      <Image
        source={require("images/Icon/ic_notification.png")}
        style={Theme.icons}
      />
    </TouchableOpacity>
  );
});

export default IconNotification;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 12,
    ...Theme.center,
    minWidth: 16,
    ...Theme.shadow,
  },
});
