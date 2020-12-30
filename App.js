import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./store";
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
      <Provider store={store}>
        <TimerScreen />
      </Provider>
    );
  };
  const SettingScreenApp = () => {
    return (
      <Provider store={store}>
        <SettingScreen />
      </Provider>
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
