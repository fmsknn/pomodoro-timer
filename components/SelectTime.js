import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from "react-native-dropdown-picker";

const SelectTime = (props) => {
  const placeholder = {};
  let items = [];
  for (let i = props.from; i <= props.to; i++) {
    items.push({
      key: i,
      label: String(i) + "minutes",
      value: i,
      color: "black",
    });
  }
  //   const items = [
  //     { label: "1 minutes", value: 1 },
  //     { label: "2 minutes", value: 2 },
  //   ];

  return (
    <View>
      {/* <DropDownPicker
        items={items}
        defaultValue={props.limit / 60}
        onChangeItem={(item) => props.setLimit(item.value * 60)}
        containerStyle={{ height: 40 }}
      /> */}
      <RNPickerSelect
        onValueChange={(value) => props.setTime(value * 60)}
        items={items}
        value={props.time / 60}
        disabled={props.action}
        placeholder={placeholder}
      />
    </View>
  );
};
export default SelectTime;
