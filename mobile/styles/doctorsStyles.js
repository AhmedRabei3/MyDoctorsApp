import { StyleSheet } from "react-native";

export default StyleSheet.create({
  searchSection: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: "#FBFBFB",
    alignItems: "center",
  },
  doctorName: {
    fontSize: 18,
  },
  doctorSpec: {
    fontSize: 16,
  },
  // doctorsListContainer: {
  //   marginTop: 80,
  // },
  itemContainer: {
    padding: 15,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  doctorAvatarText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  doctorInfo: {
    alignItems: "flex-end",
    marginRight: 15,
  },
  noDoctorsText: {
    textAlign: "center",
    paddingTop: 50,
    fontSize: 18,
  },
});
