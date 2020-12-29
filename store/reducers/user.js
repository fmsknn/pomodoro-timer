const initialState = {
  sessionNum: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SESSION_NUM":
      return {
        ...state,
        sessionNum: [action.sessionNum],
      };
    default:
      return state;
  }
};

export default reducer;
