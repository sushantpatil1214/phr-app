import React, { memo } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import Theme from "style/Theme";
import scale from "utils/scale";
import Colors from "configs/Colors";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import Text from "elements/Text";
import { ICON } from "images/Icon";
import useModalAnimation from "hooks/useModalAnimation";
import DialogConfirm from "components/DialogConfirm";
import Container from "elements/Layout/Container";
import Layout from "elements/Layout/Layout";

const PaymentSuccessful = memo(({ route }: any) => {
  const { navigate, setOptions } = useNavigation();
  const { visible, open, close, transY } = useModalAnimation();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <Container style={{ ...Theme.headerBackGround }} />
      ),
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  }, [setOptions]);

  return (
    <Container style={styles.container}>
      <Text size={24} lineHeight={28} bold marginTop={scale(16)}>
        Payment Successful!
      </Text>
      <Layout style={styles.frame}>
        <Text size={15} lineHeight={24} center marginTop={scale(8)}>
          Your request has been sent Doctors!{"\n"}Please wait a minute.
        </Text>
        <Image style={styles.iconStyle} source={ICON.loading} />
        <TouchableOpacity
          activeOpacity={0.54}
          style={styles.cancel}
          onPress={open}
        >
          <Text
            size={13}
            lineHeight={16}
            color={Colors.GrayBlue}
            textDecorationLine="underline"
          >
            Cancel request
          </Text>
        </TouchableOpacity>
      </Layout>
      <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={"none"}
      >
        <DialogConfirm
          open={open}
          close={close}
          onPress={close}
          transY={transY}
        />
      </Modal>
    </Container>
  );
});

export default PaymentSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  frame: {
    ...Theme.shadow,
    justifyContent: "flex-start",
    alignItems: "center",
    height: scale(328),
    borderRadius: scale(16),
    marginTop: scale(40, true),
    padding: scale(24),
    width: scale(328),
  },
  iconStyle: {
    marginTop: scale(48),
  },
  cancel: {
    marginTop: scale(58),
  },
});
