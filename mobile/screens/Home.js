import { View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text } from "react-native-elements";
import { ImageBackground } from "react-native";
import styles from "../styles/homeStyles";

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const refreshToken = navigation.addListener("focus", () => {
      _checkToken();
    });
    return refreshToken;
  }, [navigation]);

  const _checkToken = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setToken(token);
  };

  return (
    <ImageBackground
      source={require("../assets/doc-bg.png")}
      style={styles.ImageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>أهلا بك في تطبيق طبيبي</Text>
        <Text style={styles.text}>التطبيق الأول للربط بين الأطباء والمرضى</Text>
        {token ? (
          <View
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "70%",
              height: "25%",
            }}
          >
            <Button
              title={
                <Text h4 style={{ color: "#fff" }}>
                  الصفحة الشخصية
                </Text>
              }
              onPress={() => navigation.navigate("Profile")}
            />
            <Button
              type="clear"
              title={
                <Text h4 style={{ color: "skyblue" }}>
                  قائمة الأطباء
                </Text>
              }
              onPress={() => navigation.navigate("Doctor")}
            />
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              width: "60%",
              height: "25%",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              title={
                <Text h4 style={{ color: "#fff" }}>
                  تسجيل الدخول
                </Text>
              }
              onPress={() => navigation.navigate("Login")}
            />
            <Button
              type="clear"
              title={
                <Text h4 style={{ color: "skyblue" }}>
                  التسجيل
                </Text>
              }
              onPress={() => navigation.navigate("Register")}
              style={{ width: "35%" }}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
