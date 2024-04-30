import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    direction: "rtl",
    alignItems: "center",
    marginTop: "50px",
    wdith: "90%",
  },
  checkBoxContainer: {
    flexDirection: "row-reverse",
  },
  checkbox: {
    border: "none",
    backgroundColor: "transparent",
    direction: "rtl",
  },
  icon: {
    fontSize: "25px",
  },
  textInput: {
    height: 40,
    width: "100%",
    direction: "rtl",
    textAlign: "right",
  },
  errorInput: {
    borderColor: "red",
    width: "100%",
    borderWidth: 1,
    padding: 7,
  },
  textError: {
    textAlign: "right",
    fontSize: 12,
    marginBottom: 10,
    width: "90%",
    color: "red",
  },
  mapContainer: {
    height: 200,
    margin: 20,
    width: "100%",
  },
  map: {
    flex: 1,
  },
});

export default styles;
