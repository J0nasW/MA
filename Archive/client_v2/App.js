import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import Home from "./src/screens/Home";

// Store Things - https://github.com/marcuswestin/store.js
var store = require('store')

/**
store.set("currentName", { name:"init" });
let initName = store.get("currentName").name;
store.set(initName, { address:null, protocoll:null, passphrase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
 */

const DrawerNavigation = createDrawerNavigator({ Home: Home });

const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation
    },
    Home: Home
  },
  {
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(StackNavigation);

function App() {
  store.set("count", { count: 0 })
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return isLoadingComplete ? <AppContainer /> : <AppLoading />;
  }
}
async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      "roboto-500": require("./src/assets/fonts/roboto-500.ttf"),
      "roboto-700": require("./src/assets/fonts/roboto-700.ttf"),
      "roboto-300": require("./src/assets/fonts/roboto-300.ttf"),
      "roboto-regular": require("./src/assets/fonts/roboto-regular.ttf")
    })
  ]);
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default App;
