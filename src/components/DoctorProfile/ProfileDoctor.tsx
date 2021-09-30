import React, { memo } from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "elements/Text";
import { Colors } from "configs";
import scale from "utils/scale";
import Theme from "style/Theme";
import KFormat from "utils/format/kFormat";
import { ICON } from "images/Icon";
import Layout from "elements/Layout/Layout";
import { useTheme } from "configs/Theme";

interface ProfileManagementProps {
  name?: string;
  faculty?: string;
  rate?: number;
  avatar?: any;
  review?: number;
  online?: boolean;
  address?: string;
  patients: number;
  savedLives: number;
  helpedPeople: number;
  thanksFor: number;
}

const ProfileDoctor = memo(
  ({
    name,
    faculty,
    rate,
    avatar,
    review,
    online,
    address,
    patients,
    savedLives,
    helpedPeople,
    thanksFor,
  }: ProfileManagementProps) => {
    const { theme } = useTheme();
    return (
      <Layout style={styles.container}>
        <View style={[styles.box, { borderColor: theme.background }]}>
          <View>
            <Text bold size={15} lineHeight={18}>
              {name}
            </Text>
            <Text marginBottom={8} marginTop={8} size={13} lineHeight={16}>
              {faculty}
            </Text>
            <View style={Theme.flexRow}>
              <Image source={ICON.rateFull} />
              <Text marginHorizontal={5}>{rate}</Text>
              <Text color={Colors.GrayBlue}>({review} reviews)</Text>
            </View>
            <Text marginTop={8} size={13} lineHeight={16}>
              {address}
            </Text>
          </View>
          <View style={styles.avatarView}>
            <Image style={styles.avatar} source={avatar} />
            <Layout style={styles.statusView}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: online
                      ? Colors.Malachite
                      : Colors.RedNeonFuchsia,
                  },
                ]}
              />
            </Layout>
          </View>
        </View>
        <View style={styles.item}>
          <View>
            <Text color={Colors.GrayBlue} size={11} lineHeight={14}>
              Patients
            </Text>
            <Text size={17} lineHeight={25} marginTop={2}>
              {patients}
            </Text>
          </View>
          <View>
            <Text color={Colors.GrayBlue} size={11} lineHeight={14}>
              Saved lives
            </Text>
            <Text size={17} lineHeight={25} marginTop={2}>
              {savedLives}
            </Text>
          </View>
          <View>
            <Text color={Colors.GrayBlue} size={11} lineHeight={14}>
              Helped people
            </Text>
            <Text size={17} lineHeight={25} marginTop={2}>
              {KFormat(helpedPeople)}
            </Text>
          </View>
          <View>
            <Text color={Colors.GrayBlue} size={11} lineHeight={14}>
              Thanks for
            </Text>
            <Text size={17} lineHeight={25} marginTop={2}>
              {KFormat(thanksFor)}
            </Text>
          </View>
        </View>
      </Layout>
    );
  }
);

export default ProfileDoctor;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    height: scale(210),
    marginTop: -scale(148),
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    position: "absolute",
    alignSelf: "center",
    width: "100%",
  },
  box: {
    paddingLeft: "40%",
    paddingTop: 24,
    paddingBottom: 22,
    paddingRight: 24,
    borderBottomWidth: 1,
    height: "70%",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
  },
  avatarView: {
    position: "absolute",
    top: 24,
    left: 24,
  },
  item: {
    paddingTop: 16,
    paddingHorizontal: 16,
    height: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusView: {
    width: 14,
    height: 14,
    borderRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    position: "absolute",
    right: 0,
    ...Theme.center,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});
