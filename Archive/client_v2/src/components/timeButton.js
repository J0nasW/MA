import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class TimeButton extends React.Component{

  constructor(props) {
    super(props);
    this.state = { dateTime: '' };
  }

  render() {
  return (
    <View style={styles.container}>
      <View style={styles.rect2}>
        <View style={styles.ellipseStackRow}>
          <View style={styles.ellipseStack}>
            <Svg viewBox="0 0 60 60" style={styles.ellipse}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(230, 230, 230,1)"
                cx={30}
                cy={30}
                rx={30}
                ry={30}
              ></Ellipse>
            </Svg>
            <Icon name="temperature-celsius" style={styles.icon}></Icon>
          </View>
          <View style={styles.liveTemperaturColumn}>
            <Text style={styles.liveTemperatur}>LIVE: Zeit</Text>
            <Text style={styles.liveTemperatur1}>{this.props.dateTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {marginRight: 5},
  rect2: {
    width: 300,
    height: 60,
    backgroundColor: "rgba(255,159,15,1)",
    borderRadius: 100
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 60,
    height: 60,
    position: "absolute"
  },
  icon: {
    top: 9,
    left: 10,
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    height: 43,
    width: 40
  },
  ellipseStack: {
    width: 60,
    height: 60
  },
  liveTemperatur: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)"
  },
  liveTemperatur1: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 20
  },
  liveTemperaturColumn: {
    width: 250,
    marginLeft: 11,
    marginTop: 10,
    marginBottom: 6
  },
  ellipseStackRow: {
    height: 60,
    flexDirection: "row",
    marginRight: 101
  }
});

export default TimeButton;
