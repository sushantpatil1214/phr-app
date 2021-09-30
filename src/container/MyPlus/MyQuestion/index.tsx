import React, { memo, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "elements/Text";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import ButtonLinear from "elements/Buttons/ButtonLinear";
import keyExtractor from "utils/keyExtractor";
import QuestionAnswerItem from "components/QuestionAnswerItem";
import { MY_QUESTION } from "configs/Data";
import { useTheme } from "configs/Theme";
import Container from "elements/Layout/Container";
import Layout from "elements/Layout/Layout";

export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [myQuestion, setMyQuestion] = React.useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      setMyQuestion(MY_QUESTION);
    }, [])
  );

  const handlePressSearch = React.useCallback(() => {}, []);

  const handlePressAdd = React.useCallback(() => {}, []);
  const { theme } = useTheme();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.backgroundHeader,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerRight: () => (
        <View style={Theme.flexRow}>
          <ButtonIconHeader
            icon={"search"}
            tintColor={Colors.DodgerBlue}
            borderColor={Colors.DodgerBlue}
            marginRight={24}
            onPress={handlePressSearch}
          />
          <ButtonIconHeader
            icon={"plus"}
            tintColor={Colors.DodgerBlue}
            marginRight={24}
            borderColor={Colors.DodgerBlue}
            onPress={handlePressAdd}
          />
        </View>
      ),
    });
  }, [setOptions]);

  const handlePressItem = React.useCallback((item: any) => {
    navigate(Routes.MyQuestionDetail, item);
  }, []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <Layout style={styles.box}>
        <Text center bold size={17} lineHeight={22}>
          Have a health question?
        </Text>
        <ButtonLinear style={styles.button} title={"Ask a free now!"} white />
      </Layout>
    );
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return (
      <QuestionAnswerItem
        onPress={() => handlePressItem(item)}
        style={styles.item}
        {...item}
      />
    );
  }, []);

  return (
    <Container style={styles.container}>
      <Text
        marginLeft={24}
        marginTop={24}
        bold
        size={24}
        lineHeight={28}
        marginBottom={8}
      >
        My Questions
      </Text>
      <FlatList
        data={myQuestion}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 32,
  },
  item: {
    marginHorizontal: 24,
    marginTop: 16,
  },
});
