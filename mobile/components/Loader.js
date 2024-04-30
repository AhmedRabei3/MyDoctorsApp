import { ActivityIndicator, Text, View } from "react-native";
import styles from "../styles/loaderStyle";

const Loader = (props) => {
  if (!props.loading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={75} color="#20c997" />
      {props.title && <Text style={styles.text}>{props.title}</Text>}
    </View>
  );
};

export default Loader;
