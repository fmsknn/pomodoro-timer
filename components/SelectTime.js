import React from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addWorkLimit,
  addBreakLimit,
  addBigBreakLimit,
} from "../store/actions/user";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 3,
    paddingHorizontal: 5,
    color: "black",
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 3,
    paddingVertical: 5,
    color: "black",
  },
  editIcon: {
    marginRight: 50,
    paddingLeft: 50,
    textAlign: "left",
  },
});

const SelectTime = (props) => {
  var type = props.type;
  if (type == "workLimit") {
    var execute = [addWorkLimit];
  } else if (type == "breakLimit") {
    var execute = [addBreakLimit];
  } else if (type == "bigBreakLimit") {
    var execute = [addBigBreakLimit];
  }
  // store
  const limit = useSelector((state) => state.user.timeObject[type]);
  const dispatch = useDispatch();

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
  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => dispatch(execute[0]({ time: value * 60 }))}
        items={items}
        value={limit / 60}
        disabled={props.action}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 5,
            right: "15%",
          },
        }}
        Icon={() => {
          return (
            <Ionicons
              name="chevron-down-outline"
              size={23}
              iconStyle={pickerSelectStyles.editIcon}
            />
          );
        }}
      />
    </View>
  );
};
export default SelectTime;
