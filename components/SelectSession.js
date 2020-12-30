import React from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useSelector, useDispatch } from "react-redux";
import { addSessionNum } from "../store/actions/user";

const SelectSession = (props) => {
  const sessionNum = useSelector((state) => state.user.timeObject.sessionNum);
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
        onValueChange={(value) =>
          dispatch(addSessionNum({ sessionNum: value }))
        }
        items={items}
        value={sessionNum}
        // disabled={props.action}
        placeholder={placeholder}
      />
    </View>
  );
};
export default SelectSession;
