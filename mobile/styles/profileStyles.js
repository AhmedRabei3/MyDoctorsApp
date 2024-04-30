import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  userIconContainer: {
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 3,
    shadowColor: "#000",
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.36,
    shadowRadius: 2,
    flexDirection: "row-reverse",
  },
  userMetaContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  doctorInfo: {
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.36,
    shadowRadius: 2,
    elevation: 2,
  },
  userMeta: {
    alignItems: "flex-end",
    marginRight: 15,
  },
  userAvtar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvtarText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  iconsConatiner: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  logoutButton: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 15,
    marginTop: "50px",
    backgroundColor: "#dc3545",
  },
  backButton: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 17,
  },
  infoCell: {
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#f1f1f1",
  },
  lastCell: {
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#f1f1f1",
    borderBottomWidth: 0,
  },
  infoTitle: {},
  infoText: {
    fontSize: 17,
    textAlign: "right",
  },
  mapContainer: {
    height: 200,
    marginTop: 20,
  },
  map: {
    flex: 1,
  },
});
