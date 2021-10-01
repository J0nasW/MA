import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { Chart } from 'react-charts'

  

class IOTA_Chart extends React.Component{

  constructor(props) {
    super(props);
    this.state = { temp: '' };
  }

  data = React.useMemo(
    () => [
      {
        label: 'Temperature',
        data: [
          [0, 22],
          [1, 22],
          [2, 23],
          [3, 23],
          [4, 21],
        ],
      },
      {
        label: 'Humidity',
        data: [
          [0, 68],
          [1, 69],
          [2, 68],
          [3, 65],
          [4, 66],
        ],
      },
    ],
    []
  )

  tooltipAlign = alignAuto;
  tooltipAnchor = anchorClosest

  axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'time' },
      { position: 'left', type: 'linear' }
    ],
    []
  )

  tooltip = React.useMemo(
    () => ({
      align: tooltipAlign,
      anchor: tooltipAnchor
    }),
    [tooltipAlign, tooltipAnchor]
  )

  render() {
  return (
    <View style={styles.graph}>
        <Chart
            data={data}
            axes={axes}
            primaryCursor
            secondaryCursor
            tooltip={tooltip}
        />
    </View>
  );}
}

const styles = StyleSheet.create({
    graph: {
      width: 720,
      height: 250,
      backgroundColor: "#E6E6E6",
      marginTop: 35,
      marginLeft: 100
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
    fontSize: 25
  },
  liveTemperaturColumn: {
    width: 107,
    marginLeft: 11,
    marginTop: 7,
    marginBottom: 6
  },
  ellipseStackRow: {
    height: 60,
    flexDirection: "row",
    marginRight: 101
  }
});

export default IOTA_Chart;
