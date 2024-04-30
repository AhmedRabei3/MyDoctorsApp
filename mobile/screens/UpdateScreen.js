import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from "react-native-elements";
import { ProfileForm, Loader, Alert } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../config/axios";
import { UPDATE_USER, PROFILE_URL } from "../config/urls";
import { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";

export default function UpdateScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });

  const _getProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      //code to get profile info here
      const res = await axios.get(PROFILE_URL);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setVisible(true);
      setAlert({
        title: "Oops!",
        message: "Something went wrong while fetching your information.",
        type: "alert",
      });
    }
  };

  useEffect(() => {
    _getProfile();
  }, []);

  const _update = useCallback(
    async (values) => {
      setLoading(true);

      const body = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        adress: values.adress,
        specialization: values.specialization,
        location: {
          latitude: values.latitude,
          longitude: values.longitude,
        },
        workingHours: values.workingHours,
      };

      try {
        const token = await AsyncStorage.getItem("accessToken");
        token
          ? (axios.defaults.headers.common.Authorization = `JWT ${token}`)
          : "";
        const response = await axios.put(UPDATE_USER, body);
        setLoading(false);

        setAlert({
          title: "تعديل  الحساب",
          type: "quistion",
          message: "تم التحديث بنجاح",
        });
        setVisible(true);
      } catch (error) {
        setLoading(false);
        setAlert({
          title: "تنبيه",
          type: "alert",
          message: error.response.data.errors[0].message,
        });
        setVisible(true);
      }
    },
    [navigation]
  );

  return (
    <ScrollView>
      <Loader title="جاري تحديث الحساب" loading={loading} />
      <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={() => setVisible(false)}
        onClick={() => navigation.navigate("Profile")}
      />

      {user && (
        <>
          <View style={styles.container}>
            <Icon
              raised
              name="user"
              type="font-awesome"
              color="#039be5"
              size={50}
            />
            <Text h4>تحديث بياناتي </Text>
          </View>
          <KeyboardAvoidingView width="100%" behavior="padding" enabled>
            <View style={{ width: "100%" }}>
              <ProfileForm
                user={user}
                submit={(values) => {
                  _update(values);
                }}
                disable={true}
                Btitle={"تحديث"}
                mode="update"
              />
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    padding: 15,
  },
});
