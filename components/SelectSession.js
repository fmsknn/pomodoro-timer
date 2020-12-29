import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { addSessionNum } from "../store/actions/user";

const SelectSession = (props) => {
  const dispatch = useDispatch();
  const placeholder = {};
  let items = [];
  for (let i = props.from; i <= props.to; i++) {
    items.push({
      key: i,
      label: String(i) + "sessions",
      value: i,
      color: "black",
    });
  }

  return (
    <View>
      <RNPickerSelect
        //   props.setSession(value)}
        onValueChange={(value) =>
          dispatch(addSessionNum({ sessionNum: value }))
        }
        items={items}
        value={props.session}
        disabled={props.action}
        placeholder={placeholder}
      />
    </View>
  );
};
export default SelectSession;
