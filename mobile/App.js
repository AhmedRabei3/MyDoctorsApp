import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  ProfileScreen,
  DoctorsScreen,
  RegisterScreen,
  LoginScreen,
  UpdateScreen,
} from "./screens";
import React from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#007bff" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "right",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "تسجيل الدخول" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "صفحتي" }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "تسجيل مستخدم جديد" }}
        />
        <Stack.Screen
          name="Doctor"
          component={DoctorsScreen}
          options={{ title: "صفحة الأطباء" }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateScreen}
          options={{ title: "تعديل البيانات الشخصية" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
