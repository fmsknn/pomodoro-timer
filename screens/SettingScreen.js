import React from "react";
import { Text, View } from "react-native";
import SelectTime from "../components/SelectTime";
import SelectSession from "../components/SelectSession";
const SettingScreen = () => {
  return (
    <View>
      <Text>Work session duration</Text>
      <SelectTime type="workLimit" from="1" to="60" />
      <Text>Small break duration</Text>
      <SelectTime type="breakLimit" from="1" to="60" />
      <Text>Big break duration</Text>
      <SelectTime type="bigBreakLimit" from="1" to="60" />
      <Text>Work sessions until big break</Text>
      <SelectSession from="1" to="10" />
    </View>
  );
};
export default SettingScreen;
