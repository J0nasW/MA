import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import TempButton from "./TempButton";
import HumidityButton from "./HumidityButton";
import TimeButton from "./timeButton";

import {
  Label, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,
} from 'recharts';

// Store Things
var store = require('store');

// Mapbox Things
/**
import MapboxGL from '@mapbox/react-native-mapbox-gl';
MapboxGL.accessToken = 'pk.eyJ1Ijoiam9uYXN3aSIsImEiOiJja2c5czZ5bWwwMDhsMnhsbHNiczRubHpoIn0.4ES6B_UurMlwKpwVEvWjCw';
const coordinates = [[53.529444, 9.921735]];
 */

const init = (history) => {
  var data = [
    { name: history[9].dateTime, temp: parseInt(history[9].Temperature), hum: parseInt(history[9].Humidity), },
    { name: history[8].dateTime, temp: parseInt(history[8].Temperature), hum: parseInt(history[8].Humidity), },
    { name: history[7].dateTime, temp: parseInt(history[7].Temperature), hum: parseInt(history[7].Humidity), },
    { name: history[6].dateTime, temp: parseInt(history[6].Temperature), hum: parseInt(history[6].Humidity), },
    { name: history[5].dateTime, temp: parseInt(history[5].Temperature), hum: parseInt(history[5].Humidity), },
    { name: history[4].dateTime, temp: parseInt(history[4].Temperature), hum: parseInt(history[4].Humidity), },
    { name: history[3].dateTime, temp: parseInt(history[3].Temperature), hum: parseInt(history[3].Humidity), },
    { name: history[2].dateTime, temp: parseInt(history[2].Temperature), hum: parseInt(history[2].Humidity), },
    { name: history[1].dateTime, temp: parseInt(history[1].Temperature), hum: parseInt(history[1].Humidity), },
    { name: history[0].dateTime, temp: parseInt(history[0].Temperature), hum: parseInt(history[0].Humidity), },
  ];
  return data;
}

class Popupwin extends React.Component {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

    constructor(props) {
    super(props);
    this.state = {
      data: '',
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: '23',
      bottom: '18',
      top2: '80',
      bottom2: '50',
      animation: true,
      //coordinates: coordinates
    };
    }

    /** 
    renderAnnotation (counter) {
      const id = `pointAnnotation${counter}`;
      const coordinate = this.state.coordinates[counter];
      const title = `Longitude: ${this.state.coordinates[counter][0]} Latitude: ${this.state.coordinates[counter][1]}`;
  
      return (
        <MapboxGL.PointAnnotation
          key={id}
          id={id}
          title='Test'
          coordinate={coordinate}>
  
          <Image
          source={require('../assets/images/marker.png')}
          style={{
            flex: 1,
            resizeMode: 'contain',
            width: 25,
            height: 25
            }}/>
        </MapboxGL.PointAnnotation>
      );
    }

    renderAnnotations () {
      const items = [];
  
      for (let i = 0; i < this.state.coordinates.length; i++) {
        items.push(this.renderAnnotation(i));
      }
  
      return items;
    }
    */
    
//<IOTA_Chart style={styles.graph} />
  render() {
    
    var payload = store.get(this.props.data).payload;
    var history = store.get(this.props.data).history;

    var data = init(history)
    
    const {
      barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,
    } = this.state;
    
  
    return (
      <View style={styles.container}>
        <View style={styles.rect}>
          <View style={styles.Row1}>
            <View style={styles.company}>
              <Icon name="question" style={styles.icon}></Icon>
            </View>
            <View style={styles.Row1Column1}>
              <Text style={styles.container_heading}>Container</Text>
              <Text style={styles.container_name}>{payload.container}</Text>
            </View>
            <View style={styles.Row1Column2}>
              <Text style={styles.buchungsnummer_heading}>Buchungsnummer</Text>
              <Text style={styles.buchungsnummer}>{payload.booking_nr}</Text>
            </View>
          </View>

          <View style={styles.Row2}>
            <TempButton style={styles.tempButton} temp={payload.Temperature}></TempButton>
            <HumidityButton style={styles.humidityButton} humidity={payload.Humidity}></HumidityButton>
            <TimeButton style={styles.timeButton} dateTime={payload.dateTime}></TimeButton>
          </View>

          <View style={styles.graph}>
            <AreaChart
            width={800}
            height={250}
            data={data}
            >
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D9CDB" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2D9CDB" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#008C95" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#008C95" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                allowDataOverflow
                dataKey="name"
                domain={[left, right]}
                type="category"
              />
              <YAxis
                allowDataOverflow
                domain={[16, 22]}
                type="number"
                yAxisId="1"
              />
              <YAxis
                orientation="right"
                allowDataOverflow
                domain={[50, 70]}
                type="number"
                yAxisId="2"
              />
              <Tooltip />
              <Area yAxisId="1" type="monotone" dataKey="temp" stroke="#2D9CDB" animationDuration={300} fillOpacity={1} fill="url(#colorTemp)" />
              <Area yAxisId="2" type="monotone" dataKey="hum" stroke="#008C95" animationDuration={300} fillOpacity={1} fill="url(#colorHum)" />

              {
                (refAreaLeft && refAreaRight) ? (
                  <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
                }
            </AreaChart>
          </View>
          

          

          
          <Image
            source={require("../assets/images/001-lettuce.png")}
            resizeMode="contain"
            style={styles.image_lettuce}
          ></Image>
          <View style={styles.Row3}>
            <Image
              source={require("../assets/images/003-snowflake.png")}
              resizeMode="contain"
              style={styles.image_frozen}
            ></Image>
            <View style={styles.Content_Stack}>
              <Text style={styles.blattsalat}>{payload.content}</Text>
              <Text style={styles.gefroren}>gefroren</Text>
            </View>
          </View>

          <View style={styles.Row4}>
            <View style={styles.Row4Column1}>
              <Text style={styles.abfahrt}>Abfahrt</Text>
              <Text style={styles.abfahrt_ort}>Hamburg, Deutschland</Text>
              <Text style={styles.abfahrt_zeit}>26. September 2020, 08:32 Uhr</Text>
            </View>

            <View style={styles.Row4Column2}>
              <Text style={styles.ankunft}>Ankunft</Text>
              <Text style={styles.ankunft_ort}>Rotterdam, Niederlande</Text>
              <Text style={styles.ankunft_zeit}>27. September 2020, 15:53 Uhr</Text>
            </View>
          </View>

        </View>
      </View>
    );}
}

/**
<View style={styles.Row35}>
            <View style={styles.Row35Column1}>
              <Image
                source={require("../assets/images/001-lettuce.png")}
                resizeMode="contain"
                style={styles.image_lettuce}
              ></Image>
              <View style={styles.Row3}>
                <Image
                  source={require("../assets/images/003-snowflake.png")}
                  resizeMode="contain"
                  style={styles.image_frozen}
                ></Image>
                <View style={styles.Content_Stack}>
                  <Text style={styles.blattsalat}>{payload.content}</Text>
                  <Text style={styles.gefroren}>gefroren</Text>
                </View>
              </View>
            </View>

            <View style={styles.Row35Column2}>
              <View style={{flex: 1}}>
                <MapboxGL.MapView
                  ref={(c) => this._map = c}
                  style={{flex: 1}}
                  zoomLevel={11}
                  showUserLocation={true}
                  userTrackingMode={1}
                  centerCoordinate={this.state.coordinates[0]}>
                    {this.renderAnnotations()}
                </MapboxGL.MapView>
              </View>
            </View>
          </View>
 */

const styles = StyleSheet.create({
  container: {},
  rect: {
    backgroundColor: "rgba(255,255,255,1)"
  },
  Row1: {
    height: 100,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 40,
  },
    company: {
      width: 75,
      height: 75,
      borderWidth: 3,
      borderColor: "rgba(155,155,155,1)",
      borderRadius: 25
    },
    icon: {
      color: "rgba(128,128,128,1)",
      fontSize: 50,
      height: 50,
      width: 30,
      marginTop: 7,
      marginLeft: 20
    },

    Row1Column1: {
      width: 350,
      marginLeft: 40,
      marginTop: 15
    },
      container_heading: {
        fontFamily: "roboto-regular",
        color: "rgba(119,119,119,1)",
        fontSize: 20,
        marginTop: -5
      },
      container_name: {
        fontFamily: "roboto-700",
        color: "rgba(0,0,0,1)",
        fontSize: 30,
        marginTop: -3
      },

    Row1Column2: {
      width: 180,
      marginLeft: 80,
      marginTop: 15,
    },
      buchungsnummer_heading: {
        fontFamily: "roboto-regular",
        color: "rgba(119,119,119,1)",
        fontSize: 20,
        marginTop: -5
      },
      buchungsnummer: {
        fontFamily: "roboto-500",
        color: "rgba(0,0,0,1)",
        fontSize: 25,
        marginTop: -3
      },
  
  Row2: {
    height: 60,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 100,
  },
    tempButton: {
      height: 60,
      width: 200,
      marginRight: 10
    },
    humidityButton: {
      height: 60,
      width: 200,
      marginRight: 10
    },
    timeButton: {
      height: 60,
      width: 200,
    },


  graph: {
    width: 720,
    height: 250,
    marginTop: 35,
    marginLeft: 100,
    fontFamily: "roboto-regular",
    color: "rgba(119,119,119,1)",
    fontSize: 14,
  },

  Row3: {
    height: 51,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 382,
    marginRight: 382
  },
    image_lettuce: {
      width: 100,
      height: 100,
      marginTop: 40,
      alignSelf: "center"
    },
  image_frozen: {
    width: 35,
    height: 35,
    marginTop: 10
  },
  Content_Stack: {
    width: 120,
    height: 50,
    marginLeft: 10,
    alignSelf: "center"
  },
    blattsalat: {
      fontFamily: "roboto-regular",
      color: "rgba(0,0,0,1)",
      fontSize: 25
    },
    gefroren: {
      fontFamily: "roboto-regular",
      color: "rgba(119,119,119,1)",
      fontSize: 20,
    },
  
  Row35: {
      height: 300,
      flexDirection: "row",
      marginTop: 10,
      alignSelf: "center"
    },
      Row35Column1: {
        width: 200,
        marginLeft: 10
      },
        
      Row35Column2: {
        width: 600,
        marginRight: 10
      },

  Row4: {
    height: 200,
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "center"
  },
    Row4Column1: {
      width: 400,
      marginLeft: 10
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
    Row4Column2: {
      width: 400,
      marginRight: 10
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


  abfahrt3: {
    fontFamily: "roboto-regular",
    color: "rgba(119,119,119,1)",
    fontSize: 20
  },
  ankunft1: {
    fontFamily: "roboto-regular",
    color: "rgba(119,119,119,1)",
    fontSize: 20,
    marginLeft: 477
  },
  abfahrt3Row: {
    height: 24,
    flexDirection: "row",
    marginTop: 37,
    marginLeft: 27,
    marginRight: 276
  },
  hamburgDeutschland3: {
    fontFamily: "roboto-500",
    color: "rgba(0,0,0,1)",
    fontSize: 30
  },
  hamburgDeutschland1: {
    fontFamily: "roboto-500",
    color: "rgba(0,0,0,1)",
    fontSize: 30,
    marginLeft: 237
  },
  hamburgDeutschland3Row: {
    height: 37,
    flexDirection: "row",
    marginLeft: 27,
    marginRight: 28
  },
  abfahrt2: {
    fontFamily: "roboto-regular",
    color: "rgba(119,119,119,1)",
    fontSize: 20
  },
  abfahrt1: {
    fontFamily: "roboto-regular",
    color: "rgba(119,119,119,1)",
    fontSize: 20,
    marginLeft: 270
  },
  abfahrt2Row: {
    height: 24,
    flexDirection: "row",
    marginLeft: 27,
    marginRight: 72
  }
});

export default Popupwin;
