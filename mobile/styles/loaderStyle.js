import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFill,
    backgroundColor: "#fff",
    zIndex: 9999,
  },
  text: {
    color: "#000",
    marginTop: 15,
    fontSize: 18,
  },
});
