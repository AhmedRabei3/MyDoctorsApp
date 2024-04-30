import { View, Text } from "react-native";
import styles from "../styles/profileStyles";
import MapView, { Marker } from "react-native-maps";
import { Loader, Alert } from "../components";
import { DELETE_URL, PROFILE_URL } from "../config/urls";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Icon } from "react-native-elements";
import { nameTransformer } from "../config/helper";

export default function ProfileScreen(props) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState();
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });

  useEffect(() => {
    _getProfile();
  }, []);

  const _getProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      //code to get profile info here
      const res = await axios.get(PROFILE_URL);

      setUser(res.data);
      if (res.status === 200) {
        setLoading(false);
        return res.data;
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const confirmingBox = (type) => {
    setAlert({
      title:
        type === "delete"
          ? "أنت على وشك حذف حسابك"
          : "أنت على وشك تسجيل الخروج",
      message:
        type === "delete" ? "هل جننت؟ سوف تحذف الحساب..!" : "تسجيل الخروج",
      type,
    });
    setVisible(true);
  };

  const handleActions = async () => {
    try {
      if (alert.type === "delete") {
        const token = await AsyncStorage.getItem("accessToken");
        axios.defaults.headers.common.Authorization = `JWT ${token}`;
        const res = await axios.delete(DELETE_URL);
      }
      await AsyncStorage.clear();
      props.navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      setAlert({
        title: "Alert",
        message: error,
        type: "alert",
      });
    }
  };

  const handleConfirm = async () => {
    setVisible(false);
    await handleActions();
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Alert
        visible={visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClick={handleConfirm}
        onClose={() => setVisible(false)}
      />
      {user && (
        <View>
          <View>
            <View style={styles.userMetaContainer}>
              <View style={styles.userAvtar}>
                <Text style={styles.userAvtarText}>
                  {nameTransformer(user[0]?.name)}
                </Text>
              </View>
              <View style={styles.userMeta}>
                <Text>{user[0]?.name}</Text>
                <Text>{user[0]?.email}</Text>
              </View>
              <View style={styles.iconsConatiner}>
                <Icon
                  name="edit"
                  size={35}
                  color="#4F8AFC"
                  style={{ marginLeft: "10px" }}
                  onPress={() => props.navigation.navigate("Update")}
                />
                <Icon
                  name="trash-o"
                  size={35}
                  color="#4F8AFC"
                  type="font-awesome"
                  onPress={() => confirmingBox("delete")}
                />
              </View>
            </View>

            {user[0].profile && (
              <View style={{ marginBottom: "50px" }}>
                <View style={styles.doctorInfo}>
                  <View style={styles.infoCell}>
                    <Text style={styles.infoTitle}>الاختصاص</Text>
                    <Text style={styles.infoText}>
                      {user[0].profile?.specialization}
                    </Text>
                  </View>
                  <View style={styles.infoCell}>
                    <Text style={styles.infoTitle}>العنوان</Text>
                    <Text style={styles.infoText}>
                      {user[0].profile?.adress}
                    </Text>
                  </View>
                  <View style={styles.infoCell}>
                    <Text style={styles.infoTitle}>ساعات العمل</Text>
                    <Text style={styles.infoText}>
                      {user[0].profile?.workingHours}
                    </Text>
                  </View>
                  <View style={styles.infoCell}>
                    <Text style={styles.infoTitle}> رقم الهاتف</Text>
                    <Text style={styles.infoText}>
                      {user[0].profile?.phone}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          {user[0].latitude && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: user[0]?.latitude,
                  longitude: user[0]?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: user[0]?.latitude,
                    longitude: user[0]?.longitude,
                  }}
                />
              </MapView>
            </View>
          )}
          <Button
            style={styles.logoutButton}
            title="تسجيل الخروج"
            onPress={() => confirmingBox("signout")}
          />
        </View>
      )}
    </View>
  );
}
