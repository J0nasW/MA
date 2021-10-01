import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button, Tooltip } from 'react-native-elements';

import fetchIOTA from "../functions/fetchIOTA";

// Store Things
var store = require('store');

//var updatePlugin = require('store/plugins/update');
//store.addPlugin(updatePlugin);
class Addresswin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name_string: '',
      address_string: '',
      passphrase: '',
      protocoll: '',
      iota: false,
      loading: false };
  }

  handleChangeName = event => {
    this.setState({ name_string: event.target.value })
  };

  handleChangeAddress = event => {
    this.setState({ address_string: event.target.value })
  };

  handleChangePassphrase = event => {
    this.setState({ passphrase: event.target.value })
  };

  handleInput = () => {

    this.setState({ loading:true })

    // Set the container address from INPUT
    let address = this.state.address_string;
    // Get the address length from address INPUT for protocoll detection
    let address_length = this.state.address_string.length;
    // Set Passphrase for the container from INPUT
    let passphrase = this.state.passphrase;
    // Set ContainerName from INPUT
    let containerName = this.state.name_string;

    
      // Set ContainerCount 1 up
      
      // Checking if the address belongs to IOTA
      if (address_length > 50) {

        // Container Count one up 
        let ContainerCount = store.get("count").count
        ContainerCount = ContainerCount + 1;
        store.set("count", { count:ContainerCount }) 

        this.setState({ protocoll: "iota" });
        this.setState({ iota: true });
        let protocoll = this.state.protocoll;
        //alert("Detected IOTA Protocoll - will fetch data.");
        store.set("container" + ContainerCount, { count:ContainerCount, name:containerName, address:address, protocoll:protocoll, passphrase:passphrase }); // Set all the important information for the current container to hand over to fetchIOTA()
        fetchIOTA(); // Fetch the IOTA Payload and store it with the container information
      }
      else {
        alert("No valid Address or Protocoll found.");
      }

    setTimeout(()=>{
      this.setState({ loading:false })
    }, 2000)

  };

  render() {

    const {loading} = this.state;

    return (
      <View style={styles.rect}>
          <Text style={styles.adresse}>Fügen Sie einen neuen Container hinzu:</Text>
          <View style={styles.Row_address}>
            <View style={styles.company}>
              <Icon name="question" style={styles.icon}></Icon>
            </View>
            <View style={styles.inputfields}>
            <Input
                placeholder='Container Name'
                value={this.state.name_string}
                onChange={this.handleChangeName}
                inputContainerStyle={styles.address_text}
              />
              <Input
                placeholder='Container Adresse'
                value={this.state.address_string}
                onChange={this.handleChangeAddress}
                inputContainerStyle={styles.address_text}
              />
              <Input
                placeholder='Container Passphrase'
                value={this.state.passphrase}
                onChange={this.handleChangePassphrase}
                inputContainerStyle={styles.address_text}
              />
              {this.state.iota ? 
              <Text style={styles.protocoll}>
                IOTA Protocoll detected. Will fetch data...
              </Text>
              : null }
            </View>
          </View>
          <Button
            title="Speichern"
            buttonStyle={styles.button_green}
            onPress={this.handleInput}
            loading={loading}
            disabled={loading}
          />

      </View>
    );}
}

const styles = StyleSheet.create({
  rect: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  adresse: {
    fontFamily: "roboto-regular",
    color: "rgba(119,119,119,1)",
    fontSize: 22,
    marginTop: 40,
    marginLeft: 150
  },
  Row_address: {
    height: 250,
    flexDirection: "row",
    marginTop: 5,
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
    marginTop: 5,
    marginLeft: 19
  },
  address_text: {
    width: 775,
    height: 60,
    //borderWidth: 1,
    //borderColor: "rgba(155,155,155,1)",
    //borderRadius: 25,
    marginLeft: 25,
    marginTop: 5,
    paddingLeft: 10
  },
  protocoll: {
    marginLeft: 25,
    marginTop: 5,
    paddingLeft: 10
  },
  button_green: {
    width: 135,
    height: 40,
    borderRadius: 100,
    backgroundColor: "rgba(39,144,84,1)",
    marginTop: 15,
    marginLeft: 775,
    marginBottom: 20
  },
  los: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginTop: 3,
    alignSelf: "center"
  },
  iota: {
    width: 40,
    height: 40
  }
});

export default Addresswin;
