import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import SettingScreen from "./screens/SettingScreen";
import TimerScreen from "./screens/TimerScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  const screenOption = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
      if (route.name === "Timer") {
        iconName = "timer-outline";
      } else if (route.name === "Setting") {
        iconName = "settings-outline";
      }
      return (
        <Ionicons showLabel={false} name={iconName} size={size} color={color} />
      );
    },
  });
  const TimerScreenApp = () => {
    return (
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <TimerScreen />
        </Provider>
      </PersistGate>
    );
  };
  const SettingScreenApp = () => {
    return (
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <SettingScreen />
        </Provider>
      </PersistGate>
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOption}>
        <Tab.Screen name="Timer" component={TimerScreenApp} />
        <Tab.Screen name="Setting" component={SettingScreenApp} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
