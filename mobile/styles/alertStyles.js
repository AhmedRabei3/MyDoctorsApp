import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    left: 0,
    padding: 10,
    zIndex: 1000,
  },
  alert: {
    backgroundColor: "red",
    padding: 10,
    marginBottom: 10,
  },
  alertText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 16,
    textAlign: "center",
  },
});
