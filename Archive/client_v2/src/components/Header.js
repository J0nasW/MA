import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Entypo";

function Header(props) {
  return (
    <View style={[styles.container, props.style]}>
        <View style={styles.rect}>
          <View style={styles.ContentRow}>
            <Image
              source={require("../assets/images/logu.png")}
              resizeMode="contain"
              style={styles.logU}
            ></Image>

            <View style={styles.ContentRowFiller}></View>

            <Text style={styles.container}>Container</Text>
            <Text style={styles.adressen}>Adressen</Text>
            <Text style={styles.archiv}>Archiv</Text>

            <View style={styles.profile}>
              <Svg viewBox="0 0 63 63" style={styles.ellipse}>
                <Ellipse
                  stroke="rgba(195,195,195,1)"
                  strokeWidth={3}
                  fillOpacity={0}
                  cx={32}
                  cy={32}
                  rx={30}
                  ry={30}
                ></Ellipse>
              </Svg>
              <Icon name="user" style={styles.icon}></Icon>
            </View>
          </View>
          
        </View>
        <View style={styles.blue}></View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect: {
    top: 0,
    height: 90,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      height: 5,
      width: 0
    },
    elevation: 60,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    left: 0,
    right: 0,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },

  ContentRow: {
    height: 60,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginLeft: 20,
  },

    logU: {
      width: 150,
      height: 65
    },

    ContentRowFiller: {
      flex: 1,
      flexDirection: "row"
    },

    container: {
      fontFamily: "roboto-700",
      color: "#121212",
      fontSize: 24,
      textAlign: "right",
      marginRight: 50
    },
    adressen: {
      fontFamily: "roboto-300",
      color: "rgba(98,98,98,1)",
      fontSize: 24,
      textAlign: "right",
      marginRight: 50
    },
    archiv: {
      fontFamily: "roboto-300",
      color: "rgba(98,98,98,1)",
      fontSize: 24,
      textAlign: "right",
      marginRight: 50
    },


    profile: {
      width: 50,
      height: 50,
      marginRight: 30
    },
    ellipse: {
      top: 0,
      width: 50,
      height: 50,
      position: "absolute",
      right: 0
    },
    icon: {
      top: 7,
      left: 9,
      position: "absolute",
      color: "rgba(196,196,196,1)",
      fontSize: 28,
      height: 30,
      width: 30
    },
  
    blue: {
      top: 85,
      right: 390,
      width: 110,
      height: 5,
      position: "absolute",
      backgroundColor: "rgba(1,66,137,1)"
    }
});

export default Header;
