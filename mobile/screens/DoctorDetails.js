import MapView, { Marker } from "react-native-maps";
import { nameTransformer } from "../config/helper";
import styles from "../styles/profileStyles";
import { View } from "react-native";
import { Overlay, Avatar, Text, Button } from "react-native-elements";

function DoctorDetails({ selectedDoctor, closeModal }) {
  return (
    <Overlay isVisible={selectedDoctor !== null} fullScreen>
      <View style={styles.container}>
        <View style={styles.userMetaContainer}>
          <Avatar
            size={40}
            rounded
            title={nameTransformer(selectedDoctor.name)}
            containerStyle={{ backgroundColor: "#3d4db7" }}
          />
          <View style={styles.userMeta}>
            <Text>{selectedDoctor.name}</Text>
            <Text>{selectedDoctor.email}</Text>
          </View>
        </View>
        <View style={styles.doctorInfo}>
          <View style={styles.infoCell}>
            <Text style={styles.infoTitle}>الاختصاص</Text>
            <Text style={styles.infoText}>
              {selectedDoctor.profile.specialization}
            </Text>
          </View>
          <View style={styles.infoCell}>
            <Text style={styles.infoTitle}>العنوان</Text>
            <Text style={styles.infoText}>{selectedDoctor.profile.adress}</Text>
          </View>
          <View style={styles.infoCell}>
            <Text style={styles.infoTitle}>ساعات العمل</Text>
            <Text style={styles.infoText}>
              {selectedDoctor.profile.workingHours}
            </Text>
          </View>
          <View style={styles.lastCell}>
            <Text style={styles.infoTitle}>الهاتف</Text>
            <Text style={styles.infoText}>{selectedDoctor.profile.phone}</Text>
          </View>
        </View>
        {selectedDoctor.latitude && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: selectedDoctor.latitude,
                longitude: selectedDoctor.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: selectedDoctor.latitude,
                  longitude: selectedDoctor.longitude,
                }}
              />
            </MapView>
          </View>
        )}
        <Button
          title="رجوع"
          color="#3B5998"
          style={{ marginTop: "50px" }}
          onPress={closeModal}
        />
      </View>
    </Overlay>
  );
}

export default DoctorDetails;
