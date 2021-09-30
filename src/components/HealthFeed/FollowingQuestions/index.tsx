import React, { memo } from "react";
import { View, StyleSheet, FlatList, Modal } from "react-native";
import Text from "elements/Text";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Colors, Routes } from "configs";
import ButtonLinear from "elements/Buttons/ButtonLinear";
import keyExtractor from "utils/keyExtractor";
import QuestionAnswerItem from "components/QuestionAnswerItem";
import { FOLLOWING_QUESTIONS } from "configs/Data";
import { width } from "configs/Const";
import useModalAnimation from "hooks/useModalAnimation";
import ModalSelect from "components/ModalSelect";
import Layout from "elements/Layout/Layout";
import { useTheme } from "configs/Theme";
import { getBottomSpace } from "react-native-iphone-x-helper";
import scale from "utils/scale";

const menuOptions = [
  {
    id: 0,
    name: "Unfollow Question",
  },
  {
    id: 1,
    name: "Add the Doctor to Care Team",
  },
  {
    id: 2,
    name: "Disclaimer",
  },
  {
    id: 3,
    name: "Delete Question",
    color: Colors.Red,
  },
];

export default memo(() => {
  const { navigate } = useNavigation();
  const [followingQuestion, setFollowingQuestion] = React.useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      setFollowingQuestion(FOLLOWING_QUESTIONS);
    }, [])
  );

  const askFree = () => {
    navigate(Routes.HealthQuestion);
  };

  const handlePressItem = React.useCallback((item: any) => {
    navigate(Routes.HealthFeedQuestionDetail, item);
  }, []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <Layout style={styles.box}>
        <Text center bold size={17} lineHeight={22}>
          Have a health question?
        </Text>
        <ButtonLinear
          white
          style={styles.button}
          title={"Ask a free now!"}
          onPress={askFree}
        />
      </Layout>
    );
  }, []);

  const { visible, open, close } = useModalAnimation();
  const { theme } = useTheme();
  const renderItem = React.useCallback(({ item }) => {
    return (
      <QuestionAnswerItem
        onPress={() => handlePressItem(item)}
        onOptionPress={open}
        style={styles.item}
        {...item}
      />
    );
  }, []);

  return (
    <>
      <FlatList
        data={followingQuestion}
        style={[styles.container, { backgroundColor: theme.background }]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <Modal visible={visible} onRequestClose={close} transparent>
        <ModalSelect choices={menuOptions} close={close} onPressItem={close} />
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    marginBottom: getBottomSpace() + scale(32),
  },
  box: {
    paddingVertical: 32,
    marginHorizontal: 24,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowColor: Colors.boxShadow,
    borderRadius: 16,
  },
  button: {
    marginHorizontal: 76,
    marginTop: 24,
  },
  contentContainerStyle: {
    paddingVertical: 32,
  },
  item: {
    marginHorizontal: 24,
    marginTop: 16,
  },
});
