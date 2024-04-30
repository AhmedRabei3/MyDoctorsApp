import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/authStyles";
import { Text } from "react-native-elements";
import { ProfileForm, Loader, Alert } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "../config/axios";
import { REGISTER_URL } from "../config/urls";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

export default function RegisterScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("لم يتم السماح بالوصول للموقع");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const _register = async (values) => {
    setLoading(true);

    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
      userType: values.userType ? "doctor" : "normal",
      phone: values.phone,
      adress: values.adress,
      specialization: values.specialization,
      location: {
        latitude: location ? location?.latitude : null,
        longitude: location ? location?.longitude : null,
      },
      wotkingHours: values.workingHours,
    };

    try {
      const response = await axios.post(REGISTER_URL, body);
      setLoading(false);
      setVisible(true);
      setAlert({
        title: "تم التسجيل ",
        type: "quistion",
        message: "تم التسجيل بنجاح",
      });
    } catch (error) {
      setLoading(false);
      setAlert({
        title: "تنبيه",
        type: "alert",
        message: error.response.data.errors[0].message,
      });
      setVisible(true);
    }
  };

  return (
    <ScrollView>
      <Loader title="جاري إنشاء حساب جديد" loading={loading} />
      <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={() => setVisible(false)}
        onClick={() => navigation.navigate("Login")}
      />
      <SafeAreaView>
        <View style={styles.container}>
          <Icon
            raised
            name="user"
            type="font-awesome"
            color="#039be5"
            size={50}
          />
          <Text h4>تسجيل مستخدم جديد</Text>
          <KeyboardAvoidingView behavior="padding" enabled width="100%">
            <View>
              <ProfileForm
                submit={(values) => _register(values)}
                user={{}}
                disable={false}
                Btitle={"تسجيل"}
                CheckBox={true}
                mode="reg"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
