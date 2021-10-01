import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// For the Header Menu
import { Button, Nav, Navbar, Form, FormControl, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

// For Temperature and Humidity Charts
import { Chart } from 'react-charts'

import 'bootstrap/dist/css/bootstrap.min.css';
import { anchorClosest, alignAuto } from 'react-charts/dist/react-charts.development';

// IOTA Things
//import { IotaProvider } from "react-iota";
import * as IotaProvider from '@iota/core';
import * as Converter from '@iota/converter';


async function handleReload() {
  alert('IOTA Reload started!');

  const address = 'WCPHNHXVHL9A9XXRKIEMDNQBIYYGJKMIJIOA9NQICT9EZIYXKMEJTRHGZLEUQOVNRCWGXHNBPYZTBOCEY';

  var iota = IotaProvider.composeAPI({
    provider: 'https://nodes.comnet.thetangle.org:443'
  });
  //try {
    let result = await iota.findTransactionObjects({ addresses: [address] });

    var msg = result.sort(function (a, b) { return b.timestamp - a.timestamp; });
    msg = msg.map(tx => tx.signatureMessageFragment);
    msg = msg.join('');
    msg = msg.slice(0,2186);

    var data = Converter.trytesToAscii(msg);

    //Parse JSON
    // preserve newlines, etc - use valid JSON
    data = data.toString().replace(/\\n/g, "\\n")  
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
    // remove non-printable and other non-valid JSON chars
    data = data.replace(/[\u0000-\u0019]+/g,"");
    var payload = JSON.parse(data);
    alert("Got it!");
    // Format: {"Temperature":"26.0","Humidity":"61.0","dateTime":"18/08/2020 12:09:18"}
    alert("Temperature:" + payload.Temperature);
    alert("Humidity:" + payload.Humidity);
    alert("Timestamp:" + payload.dateTime);
    localStorage.setItem('payload',payload);
    window.location.reload(false);
    return payload;
  //} catch (error) {
  //    alert("Something went wrong. Maybe the Address is not correct.");
  //    return 0;
  //}
  
}


export default function App() {

  //- REACT Charts ----------------------------------------------
  const data = React.useMemo(
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

  const tooltipAlign = alignAuto;
  const tooltipAnchor = anchorClosest

  const axes = React.useMemo(
    () => [
      { primary: true, position: 'bottom', type: 'time' },
      { position: 'left', type: 'linear' }
    ],
    []
  )

  const tooltip = React.useMemo(
    () => ({
      align: tooltipAlign,
      anchor: tooltipAnchor
    }),
    [tooltipAlign, tooltipAnchor]
  )

  //- END REACT CHARTS -------------------------------------------
  //window.location.reload(false);
  var payload = localStorage.getItem('payload');
  if (payload != 0) {
    alert(JSON.stringify(payload))
    return (
      <View style={styles.container}>
        <View style={styles.container_navbar}>
          <Navbar fixed="top" sticky="top" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              LogU IOTA Inspector
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Address" className="mr-sm-2" />
              <Button variant="outline-info">Go</Button>
            </Form>
          </Navbar>
        </View>
        
  
        <View style={styles.content_area}>
          <Card style={{ width: '18rem', zIndex: 1}}>
            <Card.Body>
              <Card.Title>Current Data</Card.Title>
              <Card.Text>
                Here you can see the current temperature and humidity data read from the IOTA Tangle.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Temperature: {payload.Temperature}</ListGroupItem>
              <ListGroupItem>Humidity: {payload.Humidity}</ListGroupItem>
              <ListGroupItem>Timestamp: {payload.dateTime}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button onClick={handleReload}>Reload</Button>
            </Card.Body>
          </Card>
          
          <View style={styles.temp_chart}>
            <Chart data={data}
                    axes={axes}
                    primaryCursor
                    secondaryCursor
                    tooltip={tooltip}
              />
          </View>
        </View>
      </View>
    );
  }
  else if (payload == 0) {
    return (
      <View style={styles.container}>
        <View style={styles.container_navbar}>
          <Navbar fixed="top" sticky="top" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              LogU IOTA Inspector
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Address" className="mr-sm-2" />
              <Button variant="outline-info">Go</Button>
            </Form>
          </Navbar>
        </View>
        
  
        <View style={styles.content_area}>
          <Card style={{ width: '18rem', zIndex: 1}}>
            <Card.Body>
              <Card.Title>Current Data</Card.Title>
              <Card.Text>
                Here you can see the current temperature and humidity data read from the IOTA Tangle.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>No Temperature Data available.</ListGroupItem>
              <ListGroupItem>No Humidity Data available.</ListGroupItem>
              <ListGroupItem>No Timestamp available.</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button onClick={handleReload}>Reload</Button>
            </Card.Body>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },

  container_navbar: {
    
  },

  content_area: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },

  temp_chart: {
    height: '350px',
    width: '40rem',
    marginLeft: 20,
    zIndex: 1
  }
});
