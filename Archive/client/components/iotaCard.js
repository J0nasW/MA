import React from 'react';
import { View } from 'react-native';

// For the Header Menu
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// IOTA Things
//import { IotaProvider } from "react-iota";
import * as IotaProvider from '@iota/core';
import * as Converter from '@iota/converter';


export default async function iotaCard() {

  const address =
  'HDSLPMUBBJSRUEKGTKZXUZZJFHIVGDPMFNUZYYBAWNUKLUCJT9OKNYXWUSOBRXCXNMJS99KTSIMQTKPUDPVBFJ9KVW';

  var iota = IotaProvider.composeAPI({
    provider: 'https://nodes.comnet.thetangle.org:443'
  });

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
  // Format: {"Temperature":"26.0","Humidity":"61.0","dateTime":"18/08/2020 12:09:18"}

  return (
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
    </Card>

    </View>
  );
}

