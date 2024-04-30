import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "../styles/authStyles";

function MapViewContainer(props) {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={{
          latitude: props.location.latitude,
          longitude: props.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: props.location.latitude,
            longitude: props.location.longitude,
          }}
          draggable
          onDragEnd={(e) => {
            const region = e.nativeEvent;
            props.lat(region.coordinate.latitude);
            props.lng(region.coordinate.longitude);
          }}
        />
      </MapView>
    </View>
  );
}

export default MapViewContainer;
