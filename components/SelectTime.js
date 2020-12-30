import React from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useSelector, useDispatch } from "react-redux";
import {
  addWorkLimit,
  addBreakLimit,
  addBigBreakLimit,
} from "../store/actions/user";

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
      />
    </View>
  );
};
export default SelectTime;
