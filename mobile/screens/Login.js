import { Formik } from "formik";
import * as yup from "yup";
import styles from "../styles/authStyles";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Text, Button } from "react-native-elements";
import axios from "../config/axios";
import { LOGIN_URL } from "../config/urls";
import { Alert, Loader } from "../components";
import { ScrollView, View, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen(props) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });

  const validation = yup.object().shape({
    email: yup.string().lowercase(true).email().required("الإيميل مطلوب"),
    password: yup
      .string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("Password is required"),
  });

  _login = async (values) => {
    setLoading(true);
    const body = {
      email: values.email,
      password: values.password,
    };
    try {
      let res = await axios.post(LOGIN_URL, body);
      await AsyncStorage.setItem("accessToken", res.data.token);
      setLoading(false);
      props.navigation.navigate("Home");
      setAlert({
        title: "تم التسجيل ",
        type: "alert",
        message: "تم تسجيل الدخول بنجاح",
      });
      setVisible(true);
    } catch (error) {
      setLoading(false);
      setAlert({
        title: "تنبيه",
        message: error.response.data.msg,
        type: "alert",
      });
      setVisible(true);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Loader loading={loading} title={"جاري تسجيل الدخول"} />
        <Icon
          raised
          name="user"
          type="font-awesome"
          color="#039be5"
          size={50}
        />
        <Text h4> تسجيل الدخول </Text>
        <Alert
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          title={alert.title}
          type={alert.type}
          message={alert.message}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={styles.container}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validation}
            onSubmit={(values) => _login(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <Input
                  name="email"
                  placeholder="البريد الإلكتروني"
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  keyboardType="email-address"
                  type="email"
                  style={[styles.textInput, errors.email && styles.errorInput]}
                />
                {errors.email && (
                  <Text p style={styles.textError}>
                    {errors.email}
                  </Text>
                )}
                <Input
                  name="password"
                  secureTextEntry
                  value={values.password}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  placeholder="كلمة المرور"
                  style={[
                    styles.textInput,
                    errors.password && styles.errorInput,
                  ]}
                />
                {errors.password && (
                  <Text p style={styles.textError}>
                    {errors.password}
                  </Text>
                )}
                <Button
                  disabled={!isValid}
                  title={"الدخول"}
                  style={{ margin: "20px" }}
                  onPress={handleSubmit}
                  block
                />
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
