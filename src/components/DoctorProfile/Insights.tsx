import React, { memo } from "react";
import { View, StyleSheet, FlatList, Modal } from "react-native";
import SearchBox from "elements/SearchBox";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import { Colors } from "configs";
import Theme from "style/Theme";
import keyExtractor from "utils/keyExtractor";
import HealthFeedItem from "components/HealthFeedItem";
import useModalWithKeyboard from "hooks/useModalWithKeyboard";
import ModalInsightsFilter from "components/ModalInsightsFilter";
import Container from "elements/Layout/Container";
import Layout from "elements/Layout/Layout";
import { useTheme } from "configs/Theme";

interface InsightsProps {
  insights?: any;
  filterInsights?: any;
}

const Insights = memo(({ insights, filterInsights }: InsightsProps) => {
  const { theme } = useTheme();
  const [searchKey, setSearchKey] = React.useState<string>("");
  const {
    visible: visibleFilter,
    open: openFilter,
    close: closeFilter,
    translateY: translateYFilter,
  } = useModalWithKeyboard(false);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <View style={styles.searchView}>
        <SearchBox
          borderColor={theme.borderColor}
          placeholder={"Search question, tip..."}
          value={searchKey}
          onChangeText={setSearchKey}
          style={styles.search}
        />
        <ButtonIconHeader
          onPress={openFilter}
          tintColor={Colors.GrayBlue}
          icon={"filter"}
          style={styles.headerButton}
        />
      </View>
    );
  }, [searchKey, openFilter]);

  const handlePressItem = (item: any) => {};

  const renderItem = React.useCallback(({ item }) => {
    return (
      <HealthFeedItem
        onPress={() => handlePressItem(item)}
        style={styles.healthFeedItem}
        {...item}
      />
    );
  }, []);

  return (
    <Container style={styles.container}>
      <FlatList
        data={insights}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        ListHeaderComponent={listHeaderComponent}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        visible={visibleFilter}
        onRequestClose={closeFilter}
        transparent
        animationType={"fade"}
      >
        <ModalInsightsFilter
          data={filterInsights}
          close={closeFilter}
          translateY={translateYFilter}
          handleShowResults={closeFilter}
        />
      </Modal>
    </Container>
  );
});

export default Insights;

const styles = StyleSheet.create({
  container: {},
  searchView: {
    ...Theme.flexRow,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  search: {
    flex: 1,
    marginTop: 0,
    marginRight: 16,
    borderWidth: 1,
  },
  healthFeedItem: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  headerButton: {
    marginBottom: 28,
  },
});
