import { useState, useEffect } from "react";
import axios from "../config/axios";
import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Loader } from "../components";
import { nameTransformer } from "../config/helper";
//import styles from "../styles/doctorsStyles";
import { ListItem, SearchBar, Avatar, Text } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { GET_DOCTORS } from "../config/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DoctorDetails from "./DoctorDetails";

export default function DoctorScreen(props) {
  const [search, setSerch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSD] = useState(null);

  //console.log(selectedDoctor.profile.specialization);

  useEffect(() => {
    const timer = setTimeout(() => {
      _getDoctors(search);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  async function _getDoctors(query) {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      token
        ? (axios.defaults.headers.common.Authorization = `JWT ${token}`)
        : console.log("no token was founded");
      const res = await axios.get(GET_DOCTORS, {
        params: { q: query ? query : "" },
      });
      res ? setDoctors(res.data) : null;
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Loader loading={loading} title={"جاري إحضار بيانات الأطباء"} />
      <ScrollView>
        {selectedDoctor !== null && (
          <DoctorDetails
            selectedDoctor={selectedDoctor}
            closeModal={() => setSD(null)}
          />
        )}

        <SafeAreaView>
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={{ display: "flex" }}
          >
            <SearchBar
              placeholder="البحث عن طبيب"
              containerStyle={{ backgroundColor: "#fbfbfb" }}
              inputContainerStyle={{ backgroundColor: "#e5e4e5" }}
              style={{ direction: "rtl" }}
              value={search}
              onChangeText={(text) => setSerch(text)}
              lightTheme
              round
            />
            {doctors?.map((doctor, index) => (
              <ListItem
                key={index}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.9}
                onPress={() => setSD(doctor)}
              >
                <Avatar
                  rounded
                  style={styles.Avatar}
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2020/07/31/15/33/face-5453349_640.png",
                  }}
                />
                <ListItem.Content>
                  <View style={styles.cardContent}>
                    <ListItem.Title>{doctor.name}</ListItem.Title>
                    <ListItem.Subtitle>
                      {doctor.profile.specialization}
                    </ListItem.Subtitle>
                  </View>
                </ListItem.Content>
                <ListItem.Chevron size={35} />
              </ListItem>
            ))}
            {!doctors && <Text h4>لا يوجد أطباء لعرضهم</Text>}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Avatar: {
    width: 80,
    height: 80,
  },
});
