import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
  },
  timer: {
    fontSize: 60,
  },
});

const Timer = (props) => {
  let minutes = Math.floor(props.leftSec / 60);
  let seconds = props.leftSec % 60;
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        {minutes}:{seconds}
      </Text>
    </View>
  );
};
export default Timer;
