import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Popupwin from "../components/Popupwin";
import Addresswin from "../components/Addresswin";

function Popup(props) {
  return (
    <View style={styles.container}>
      <View style={styles.popupwinRow}>
        <Popupwin style={styles.popupwin}></Popupwin>
        <Addresswin style={styles.addresswin}></Addresswin>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(229,229,229,1)",
    flexDirection: "row"
  },
  popupwin: {
    height: 916,
    width: 916
  },
  addresswin: {
    height: 266,
    width: 916,
    marginLeft: 19
  },
  popupwinRow: {
    height: 916,
    flexDirection: "row",
    flex: 1,
    marginRight: 30,
    marginLeft: 39,
    marginTop: 82
  }
});

export default Popup;
