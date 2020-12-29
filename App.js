import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./store";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Timer from "./components/Timer";
import SelectTime from "./components/SelectTime";
import SelectSession from "./components/SelectSession";

const Tab = createBottomTabNavigator();

const App = () => {
  const workSession = 1;
  const breakSession = 2;
  const bigBreakSession = 3;
  const [workLimit, setWorkLimit] = useState(1500);
  const [breakLimit, setBreakLimit] = useState(300);
  const [bigBreakLimit, setBigBreakLimit] = useState(900);
  const [session, setSession] = useState(4);
  const [leftSession, setLeftSession] = useState(session);
  const [currentSessionName, setCurrentSessionName] = useState("Work Session");
  const [sessionType, setSessionType] = useState(workSession);
  const [leftSec, setLeftSec] = useState(workLimit);
  const [timerObj, setTimerObj] = useState("");
  const [action, setAction] = useState(false);

  const [sound, setSound] = useState();
  async function playSound() {
    if (sessionType == workSession) {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/sounds/deduction.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/sounds/open-up.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    }
  }
  const afterTimeup = (left: any): any => {
    if (leftSec <= 0) {
      playSound();
      switchSession();
    }
  };

  const nextSession = () => {
    switchSession();
  };

  const switchSession = () => {
    clearInterval(timerObj);
    setAction(false);
    if (sessionType == workSession) {
      if (leftSession == 1) {
        switchBigBreakSession();
      } else {
        switchBreakSession();
      }
    } else if (sessionType == breakSession) {
      switchWorkSession();
    } else if (sessionType == bigBreakSession) {
      switchWorkSession();
      setLeftSession(session);
    }
  };

  const switchWorkSession = () => {
    setLeftSec(workLimit);
    setSessionType(workSession);
    setCurrentSessionName("Work Session");
  };

  const switchBreakSession = () => {
    setLeftSec(breakLimit);
    setSessionType(breakSession);
    setLeftSession(leftSession - 1);
    setCurrentSessionName("Break");
  };

  const switchBigBreakSession = () => {
    setLeftSec(bigBreakLimit);
    setSessionType(bigBreakSession);
    setLeftSession(leftSession - 1);
    setCurrentSessionName("Big Break");
  };

  const start = () => {
    setTimerObj(
      setInterval(() => {
        setLeftSec((prev: number) => prev - 1);
      }, 1000)
    );
    console.log(leftSec);
    setAction(true);
  };

  const pause = () => {
    clearInterval(timerObj);
    setAction(false);
  };

  const reset = () => {
    setLeftSec(workLimit);
    clearInterval(timerObj);
    switchWorkSession();
    setLeftSession(session);
    setAction(false);
  };

  useEffect(() => {
    afterTimeup(leftSec);
  }, [leftSec]);

  useEffect(() => {
    clearInterval(timerObj);
    if (sessionType == workSession) {
      setLeftSec(workLimit);
    }
  }, [workLimit]);

  useEffect(() => {
    clearInterval(timerObj);
    if (sessionType == breakSession) {
      setLeftSec(breakLimit);
    }
  }, [breakLimit]);

  useEffect(() => {
    clearInterval(timerObj);
    if (sessionType == bigBreakSession) {
      setLeftSec(bigBreakLimit);
    }
  }, [bigBreakLimit]);

  useEffect(() => {
    clearInterval(timerObj);
    setLeftSession(session);
    setSession(session);
  }, [session]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    buttons: {
      flexDirection: "row",
    },
  });
  const TimerScreen = () => {
    return (
      <View style={styles.container}>
        <Timer leftSec={leftSec} />
        <View style={styles.buttons}>
          <Ionicons size={60} name="stop-sharp" onPress={reset} />
          {!action && (
            <Ionicons size={60} name="play-circle-outline" onPress={start} />
          )}
          {action && (
            <Ionicons size={60} name="pause-circle-outline" onPress={pause} />
          )}
          <Ionicons
            size={60}
            name="play-skip-forward-outline"
            onPress={nextSession}
          />
        </View>
        <Text>{currentSessionName}</Text>
        <Text>
          {leftSession}/{session}
        </Text>
      </View>
    );
  };
  const SettingScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Work session duration</Text>
        <SelectTime
          setTime={setWorkLimit}
          time={workLimit}
          action={action}
          from="1"
          to="60"
        />
        <Text>Small break duration</Text>
        <SelectTime
          setTime={setBreakLimit}
          time={breakLimit}
          action={action}
          from="1"
          to="60"
        />
        <Text>Big break duration</Text>
        <SelectTime
          setTime={setBigBreakLimit}
          time={bigBreakLimit}
          action={action}
          from="1"
          to="60"
        />
        <Text>Work sessions until big break</Text>
        <Provider store={store}>
          <SelectSession
            setSession={setSession}
            session={session}
            action={action}
            from="1"
            to="10"
          />
        </Provider>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOption}>
        <Tab.Screen name="Timer" component={TimerScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
