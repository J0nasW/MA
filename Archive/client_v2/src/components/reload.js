import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Feather";

function Reload(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.ellipseStack}>
        <Svg viewBox="0 0 84 84" style={styles.ellipse}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="rgba(179,30,0,1)"
            cx={42}
            cy={42}
            rx={42}
            ry={42}
          ></Ellipse>
        </Svg>
        <Icon name="minus-circle" style={styles.icon}></Icon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ellipse: {
    top: 0,
    left: 0,
    width: 60,
    height: 60,
    position: "absolute"
  },
  icon: {
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 38,
    left: 10,
    top: 8
  },
  ellipseStack: {
    width: 60,
    height: 60
  }
});

export default Reload;
