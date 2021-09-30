import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import Text from "elements/Text";
import { Colors } from "configs";
import Theme from "style/Theme";
import ButtonIcon from "elements/Buttons/ButtonIcon";
import scale from "utils/scale";
import Dots from "./Dots";
import ProfileItem from "./ProfileItem";
import LinearColors from "elements/LinearColors";
import ButtonText from "elements/Buttons/ButtonText";
import { ICON } from "images/Icon";
import Container from "elements/Layout/Container";
import Layout from "elements/Layout/Layout";
import { useTheme } from "configs/Theme";

interface AboutProps {
  information?: string;
  images?: any;
  address?: string;
  phoneNumber?: string;
  insurancePlans?: any;
  specialities?: any;
  licensed?: string;
  workExperience?: string;
  language?: any;
  medicalSchool: string;
  imageSchool: any;
  establishSchool: string;
  education: any;
  certification: string;
  awards: any;
}

const About = memo(
  ({
    information,
    images,
    address,
    phoneNumber,
    insurancePlans,
    specialities,
    licensed,
    workExperience,
    language,
    medicalSchool,
    imageSchool,
    establishSchool,
    education,
    certification,
    awards,
  }: AboutProps) => {
    const { theme } = useTheme();
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const handleReadMore = React.useCallback(() => {}, []);

    return (
      <Container style={styles.container}>
        <Text lineHeight={20} size={17} bold marginLeft={16} marginTop={40}>
          Basic Information
        </Text>
        <ProfileItem icon={"doctor"} title={"About me"}>
          <Text
            size={13}
            lineHeight={22}
            marginLeft={22}
            marginRight={24}
            marginTop={16}
          >
            {information}
            <TouchableOpacity onPress={handleReadMore} activeOpacity={0.54}>
              <Text size={13} semiBold hilight>
                Read More
              </Text>
            </TouchableOpacity>
          </Text>
        </ProfileItem>
        <Layout style={styles.box}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          >
            {images &&
              images.map((item: any, index: number) => {
                return <Image source={item} key={index} />;
              })}
          </ScrollView>
          <Dots scrollX={scrollX} />
          <Text marginTop={16} marginLeft={24} lineHeight={24} size={15}>
            {address}
          </Text>
          <View style={styles.flexRow}>
            <ButtonIcon
              style={styles.iconPhone}
              icon={"typeCall"}
              disabled={true}
            />
            <Text
              marginLeft={12}
              bold
              size={15}
              lineHeight={18}
              color={Colors.DodgerBlue}
            >
              {phoneNumber}
            </Text>
          </View>
          <Text marginLeft={24} marginTop={24} bold size={13} lineHeight={16}>
            Accepted Insurance Plans
          </Text>
          {insurancePlans &&
            insurancePlans.map((item: any, index: number) => {
              return (
                <Text
                  size={15}
                  lineHeight={18}
                  marginLeft={24}
                  marginTop={12}
                  key={index}
                >
                  {item}
                </Text>
              );
            })}
        </Layout>
        <Text lineHeight={20} size={17} bold marginLeft={16} marginTop={48}>
          My Work Experience
        </Text>
        <ProfileItem
          icon={"healthNormal"}
          title={"Specialities"}
          verifyRequired
        >
          {specialities &&
            specialities.map((item: any, index: number) => {
              const { icon, title } = item;
              return (
                <View key={index} style={styles.setRow}>
                  <LinearColors
                    vertical
                    colors={[Colors.TurquoiseBlue, Colors.TealBlue]}
                    style={styles.contentIcon}
                  >
                    <Image source={ICON[`${icon}`]} />
                  </LinearColors>
                  <Text marginLeft={16} size={15} lineHeight={18}>
                    {title}
                  </Text>
                </View>
              );
            })}
        </ProfileItem>
        <ProfileItem icon={"exp"} title={"Experience"} verifyRequired>
          <Text marginTop={24} marginLeft={24} size={13} lineHeight={16}>
            I am licensed to see patients from
          </Text>
          <Text marginTop={8} marginLeft={24} bold size={15} lineHeight={18}>
            {licensed}
          </Text>
          <Text marginTop={24} marginLeft={24} size={13} lineHeight={16}>
            Work Experience
          </Text>
          <Text marginTop={8} marginLeft={24} bold size={15} lineHeight={18}>
            {workExperience}
          </Text>
          <Text marginTop={24} marginLeft={24} size={13} lineHeight={16}>
            Language
          </Text>
          <View style={styles.viewLanguage}>
            {language &&
              language.map((item: any, index: number) => {
                return (
                  <Text bold size={15} lineHeight={18} key={index}>
                    {index < 1 ? item : " " + item}
                    {index < language.length - 1 && ","}
                  </Text>
                );
              })}
          </View>
        </ProfileItem>
        <Text lineHeight={20} size={17} bold marginLeft={16} marginTop={48}>
          Educations & Certifications
        </Text>
        <ProfileItem icon={"edu"} title={"Education"} verifyRequired>
          <Text marginTop={24} marginLeft={24} size={13} lineHeight={16}>
            Medical School
          </Text>
          <View style={{ flexDirection: "row", marginLeft: 24, marginTop: 12 }}>
            <Image style={styles.schoolPhoto} source={imageSchool} />
            <View>
              <Text
                bold
                size={15}
                lineHeight={18}
                style={{ maxWidth: scale(213) }}
              >
                {medicalSchool}
              </Text>
              <Text
                marginTop={8}
                size={13}
                lineHeight={16}
                color={Colors.GrayBlue}
              >
                {establishSchool}
              </Text>
            </View>
          </View>
          <Text marginTop={24} marginLeft={24} size={13} lineHeight={16}>
            Education
          </Text>
          <View style={styles.viewEducation}>
            {education &&
              education.map((item: any, index: number) => {
                return (
                  <Text bold size={15} lineHeight={18} key={index}>
                    {index < 1 ? item : " " + item}
                    {index < language.length - 1 && ","}
                  </Text>
                );
              })}
          </View>
          <Text marginTop={24} marginLeft={24} size={13} lineHeight={16}>
            Certification
          </Text>
          <Text marginTop={8} marginLeft={24} bold size={15} lineHeight={18}>
            {certification}
          </Text>
        </ProfileItem>
        <ProfileItem
          icon={"certification"}
          title={"Certification & Awards"}
          verifyRequired
        >
          {awards &&
            awards.map((item: any, index: number) => {
              const { award, year } = item;
              return (
                <View style={styles.itemAward} key={index}>
                  <Text bold size={15} lineHeight={18}>
                    {award}
                  </Text>
                  <Text
                    marginTop={8}
                    size={13}
                    lineHeight={16}
                    color={Colors.GrayBlue}
                  >
                    {year}
                  </Text>
                </View>
              );
            })}
        </ProfileItem>
        <Text lineHeight={20} size={17} bold marginLeft={16} marginTop={48}>
          Additional Information
        </Text>
        <ProfileItem icon={"edu"} title={"Education"}>
          <TouchableOpacity style={Theme.center}>
            <Text marginTop={24} blueLight>Garden State Allergy and Asthma Center</Text>
          </TouchableOpacity>
        </ProfileItem>
      </Container>
    );
  }
);

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginTop: 16,
    borderRadius: 16,
    paddingBottom: 24,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  topBox: {
    ...Theme.flexRowSpace,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  rounded: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.OysterBay,
    ...Theme.center,
  },
  buttonEdit: {
    width: 24,
    height: 24,
    backgroundColor: Colors.DodgerBlue,
  },
  images: {
    width: scale(348),
    height: scale(200),
  },
  iconPhone: {
    backgroundColor: Colors.RedNeonFuchsia,
    width: 24,
    height: 24,
    borderRadius: 8,
  },
  flexRow: {
    ...Theme.flexRow,
    marginTop: 16,
    marginLeft: 24,
  },
  contentIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.TealBlue,
    ...Theme.center,
    borderRadius: 16,
    marginRight: 16,
  },
  setRow: {
    ...Theme.flexRow,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  viewLanguage: {
    ...Theme.flexRow,
    marginLeft: 24,
    marginTop: 8,
  },
  schoolPhoto: {
    width: 56,
    height: 56,
    borderRadius: 56,
    marginRight: 8,
  },
  viewEducation: {
    ...Theme.flexRow,
    marginLeft: 24,
    marginTop: 8,
  },
  itemAward: {
    marginTop: 24,
    marginLeft: 24,
  },
});
