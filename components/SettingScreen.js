import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectTime from "./SelectTime";
import SelectSession from "./SelectSession";
const SettingScreen = (props) => {
  return (
    <View>
      <Text>Work session duration</Text>
      <SelectTime
        setTime={props.setWorkLimit}
        time={props.workLimit}
        action={props.action}
        from="1"
        to="60"
      />
      <Text>Small break duration</Text>
      <SelectTime
        setTime={props.setBreakLimit}
        time={props.breakLimit}
        action={props.action}
        from="1"
        to="60"
      />
      <Text>Big break duration</Text>
      <SelectTime
        setTime={props.setBigBreakLimit}
        time={props.bigBreakLimit}
        action={props.action}
        from="1"
        to="60"
      />
      <Text>Work sessions until big break</Text>

      <SelectSession
        setSession={props.setSession}
        session={props.session}
        action={props.action}
        from="1"
        to="10"
      />
    </View>
  );
};
export default SettingScreen;
