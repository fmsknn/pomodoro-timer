import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";
import Timer from "../components/Timer";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
  },
});
const TimerScreen = (props) => {
  //define
  const workSession = 1;
  const breakSession = 2;
  const bigBreakSession = 3;
  // store
  const workLimit = useSelector((state) => state.user.timeObject.workLimit);
  const breakLimit = useSelector((state) => state.user.timeObject.breakLimit);
  const bigBreakLimit = useSelector(
    (state) => state.user.timeObject.bigBreakLimit
  );
  const sessionNum = useSelector((state) => state.user.timeObject.sessionNum);
  const [timerObj, setTimerObj] = useState("");
  const [action, setAction] = useState(false);
  const [leftSec, setLeftSec] = useState(workLimit);
  const [leftSessionNum, setLeftSessionNum] = useState(sessionNum);
  const [currentSessionName, setCurrentSessionName] = useState("Work Session");
  const [sessionType, setSessionType] = useState(workSession);
  const [sound, setSound] = useState();

  async function playSound() {
    if (sessionType == workSession) {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/deduction.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/open-up.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    }
  }
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const start = () => {
    setTimerObj(
      setInterval(() => {
        setLeftSec((prev: number) => prev - 1);
      }, 1000)
    );
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
    setLeftSessionNum(sessionNum);
    setAction(false);
  };

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
      if (leftSessionNum == 1) {
        switchBigBreakSession();
      } else {
        switchBreakSession();
      }
    } else if (sessionType == breakSession) {
      switchWorkSession();
    } else if (sessionType == bigBreakSession) {
      switchWorkSession();
      setLeftSessionNum(sessionNum);
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
    setLeftSessionNum(leftSessionNum - 1);
    setCurrentSessionName("Break");
  };

  const switchBigBreakSession = () => {
    setLeftSec(bigBreakLimit);
    setSessionType(bigBreakSession);
    setLeftSessionNum(leftSessionNum - 1);
    setCurrentSessionName("Big Break");
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
    setLeftSessionNum(sessionNum);
  }, [sessionNum]);

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
        {leftSessionNum}/{sessionNum}
      </Text>
    </View>
  );
};
export default TimerScreen;
