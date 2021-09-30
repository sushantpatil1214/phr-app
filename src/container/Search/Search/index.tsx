import React, { memo, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Text from "elements/Text";
import Theme from "style/Theme";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import { ICON } from "images/Icon";
import { Colors } from "configs";
import {
  FOLLOWING_TOPIC_HEADER,
  SEARCH_SPECIAL_BUTTON,
  TOP_SPECIALITIES,
} from "configs/Data";
import LinearColors from "elements/LinearColors";
import FollowingTopicHeaderItem from "components/HealthFeed/FollowingTopicHeaderItem";
import AccountItem from "components/AccountItem";
import SearchView from "components/Search/SearchView";
import { useNavigation } from "@react-navigation/native";
import Container from "elements/Layout/Container";
import Layout from "elements/Layout/Layout";
import { themes, useTheme } from "configs/Theme";

export default memo(() => {
  const { navigate } = useNavigation();
  const [isSearch, setIsSearch] = useState(false);

  const onFocus = () => {
    setIsSearch(true);
  };

  const onCancel = useCallback(() => {
    setIsSearch(false);
  }, []);
  const { theme } = useTheme();
  return (
    <Container style={styles.container}>
      {isSearch ? (
        <View />
      ) : (
        <View
          style={[
            styles.headerSearch,
            { backgroundColor: theme.backgroundHeader },
          ]}
        >
          <TouchableOpacity
            onPress={onFocus}
            activeOpacity={1}
            style={[
              styles.textInput,
              { backgroundColor: theme.backgroundItem },
            ]}
          >
            <Image source={ICON.search} />
            <Text
              color={Colors.GrayBlue}
              size={15}
              lineHeight={18}
              marginLeft={16}
              semiBold
            >
              Search health issue, doctor ...
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isSearch ? (
        <SearchView onCancel={onCancel} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <View style={styles.header}>
            <Text bold size={17} lineHeight={20}>
              Top Specialities
            </Text>
            <TouchableOpacity activeOpacity={0.54} style={Theme.flexRow}>
              <Text size={13} lineHeight={20} color={Colors.DodgerBlue}>
                See All
              </Text>
              <Image source={ICON.arrowRight} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={styles.headerList}
          >
            {TOP_SPECIALITIES.map((item, index) => {
              const { name, icon } = item;

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.54}
                  style={[
                    styles.specialities,
                    { backgroundColor: theme.backgroundItem },
                  ]}
                >
                  <LinearColors
                    colors={[Colors.TealBlue, Colors.TurquoiseBlue]}
                    style={styles.contentIcon}
                  >
                    <Image source={icon} />
                  </LinearColors>
                  <Text size={15} lineHeight={24} marginLeft={16}>
                    {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.header}>
            <Text bold size={17} lineHeight={20}>
              Trending Topics
            </Text>
            <TouchableOpacity activeOpacity={0.54} style={Theme.flexRow}>
              <Text size={13} lineHeight={20} color={Colors.DodgerBlue}>
                See All
              </Text>
              <Image source={ICON.arrowRight} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={styles.topicList}
          >
            {FOLLOWING_TOPIC_HEADER.map((item, index) => {
              return <FollowingTopicHeaderItem {...item} key={index} />;
            })}
          </ScrollView>
          <Text bold size={17} lineHeight={20} marginLeft={24}>
            Search Special
          </Text>
          <Layout style={styles.list}>
            {SEARCH_SPECIAL_BUTTON.map((item, index) => {
              return <AccountItem {...item} key={index} />;
            })}
          </Layout>
        </ScrollView>
      )}
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    paddingBottom: getBottomSpace(),
  },
  header: {
    ...Theme.flexRowSpace,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerSearch: {
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight(),
    paddingBottom: 12,
  },
  headerList: {
    paddingHorizontal: 24,
  },
  specialities: {
    ...Theme.flexRow,
    borderRadius: 16,
    width: 224,
    height: 88,
    marginRight: 24,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  topicList: {
    paddingHorizontal: 24,
  },
  textInput: {
    width: "100%",
    borderRadius: 8,
    borderColor: Colors.WhiteSmoke,
    borderWidth: 1,
    ...Theme.flexRow,
    height: 48,
    paddingHorizontal: 16,
  },
  list: {
    marginTop: 16,
    marginBottom: getBottomSpace() + 24,
    marginHorizontal: 24,
    borderRadius: 16,
  },
  contentIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 8,
    ...Theme.center,
  },
});
