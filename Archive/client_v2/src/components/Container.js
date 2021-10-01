import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Container(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect}>
            <View style={styles.company}>
              <Icon name="question" style={styles.icon}></Icon>
            </View>

            <View style={styles.Column1}>
              <Text style={styles.container}>Container</Text>
              <Text style={styles.container_num}>MWBNB564534884a</Text>
              <Text style={styles.abfahrt}>Abfahrt</Text>
              <Text style={styles.abfahrt_ort}>Hamburg, Deutschland</Text>
              <Text style={styles.abfahrt_zeit}>26. September 2020, 08:32 Uhr</Text>
            </View>

            <View style={styles.Column2}>
              <Text style={styles.buchungsnummer}>Buchungsnummer</Text>
              <Text style={styles.buchungsnummer_num}>35646794533</Text>
              <Text style={styles.ankunft}>Ankunft</Text>
              <Text style={styles.ankunft_ort}>Rotterdam, Niederlande</Text>
              <Text style={styles.ankunft_zeit}>27. September 2020, 15:53 Uhr</Text>
            </View>
            
            <View style={styles.ContentRowFiller}></View>
            <View style={styles.line}></View>
            <View style={styles.ContentRowFiller}></View>
            <View style={styles.content_column}>
              <Image
                source={require("../assets/images/001-lettuce.png")}
                resizeMode="contain"
                style={styles.content_image}
              ></Image>
              <View style={styles.content_row}>
                <Image
                  source={require("../assets/images/003-snowflake.png")}
                  resizeMode="contain"
                  style={styles.gefroren_image}
                ></Image>
                <View style={styles.content_stack}>
                  <Text style={styles.content_bez}>Blattsalat</Text>
                  <Text style={styles.gefroren}>gefroren</Text>
                </View>
              </View>
            </View>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 60,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderRadius: 25,
    flexDirection:'row',
    alignItems:'center',
    padding: 20,
    zIndex: 2,
  },
  company: {
    width: 75,
    height: 75,
    borderWidth: 3,
    borderColor: "rgba(155,155,155,1)",
    borderRadius: 25,
    marginLeft: 25
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 50,
    height: 50,
    width: 30,
    marginTop: 7,
    marginLeft: 20
  },

    image: {
      width: 80,
      height: 80,
      marginLeft: 30
    },

    Column1: {
      width: 350,
      marginLeft: 50
    },
      container: {
        fontFamily: "roboto-regular",
        color: "rgba(119,119,119,1)",
        fontSize: 20
      },
      container_num: {
        fontFamily: "roboto-700",
        color: "rgba(0,0,0,1)",
        fontSize: 35
      },
      abfahrt: {
        fontFamily: "roboto-regular",
        color: "rgba(119,119,119,1)",
        fontSize: 20,
        marginTop: 30
      },
      abfahrt_ort: {
        fontFamily: "roboto-500",
        color: "rgba(0,0,0,1)",
        fontSize: 30
      },
      abfahrt_zeit: {
        fontFamily: "roboto-regular",
        color: "rgba(119,119,119,1)",
        fontSize: 20
      },


    Column2: {
      width: 350,
      marginLeft: 75
    },
      buchungsnummer: {
        fontFamily: "roboto-regular",
        color: "rgba(119,119,119,1)",
        fontSize: 20
      },
      buchungsnummer_num: {
        fontFamily: "roboto-500",
        color: "rgba(0,0,0,1)",
        fontSize: 30
      },
      ankunft: {
        fontFamily: "roboto-regular",
        color: "rgba(119,119,119,1)",
        fontSize: 20,
        marginTop: 35
      },
      ankunft_ort: {
        fontFamily: "roboto-500",
        color: "rgba(0,0,0,1)",
        fontSize: 30
      },
      ankunft_zeit: {
        fontFamily: "roboto-regular",
        color: "rgba(119,119,119,1)",
        fontSize: 20
      },

    ContentRowFiller: {
      flex: 1,
      flexDirection: "row"
    },
  
    line: {
      width: 4,
      height: 200,
      backgroundColor: "#E6E6E6",
      borderRadius: 100,
      marginLeft: 50,
      marginRight: 70
    },

    content_column: {
      width: 150,
      marginRight: 75
    },

      content_image: {
        width: 106,
        height: 106,
        marginLeft: 23
      },

      content_row: {
        height: 50,
        flexDirection: "row",
        marginTop: 15
      },

        gefroren_image: {
          width: 35,
          height: 35,
          marginTop: 10
        },
        content_stack: {
          width: 100,
          height: 50,
          marginLeft: 10
        },
        content_bez: {
          top: 0,
          left: 0,
          position: "absolute",
          fontFamily: "roboto-regular",
          color: "rgba(0,0,0,1)",
          fontSize: 25
        },
        gefroren: {
          top: 25,
          left: 0,
          position: "absolute",
          fontFamily: "roboto-regular",
          color: "rgba(119,119,119,1)",
          fontSize: 20
        },
  
  
  
  
});

export default Container;
