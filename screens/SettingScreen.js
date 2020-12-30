import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectTime from "../components/SelectTime";
import SelectSession from "../components/SelectSession";

const styles = StyleSheet.create({
  container: {
    top: "13%",
    left: "7%",
  },
  settingText: {
    fontSize: 18,
    paddingTop: 15,
    fontWeight: "bold",
  },
});

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.settingText}>Work session duration</Text>
      <SelectTime type="workLimit" from="1" to="60" />
      <Text style={styles.settingText}>Small break duration</Text>
      <SelectTime type="breakLimit" from="1" to="60" />
      <Text style={styles.settingText}>Big break duration</Text>
      <SelectTime type="bigBreakLimit" from="1" to="60" />
      <Text style={styles.settingText}>Work sessions until big break</Text>
      <SelectSession from="1" to="10" />
    </View>
  );
};
export default SettingScreen;
