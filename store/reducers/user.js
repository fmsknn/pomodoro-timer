const initialState = {
  timeObject: {
    sessionNum: 4,
    workLimit: 1500,
    breakLimit: 300,
    bigBreakLimit: 900,
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SESSION_NUM":
      return {
        timeObject: { ...state.timeObject, sessionNum: action.sessionNum },
      };
    case "ADD_WORK_LIMIT":
      return {
        timeObject: { ...state.timeObject, workLimit: action.workLimit },
      };
    case "ADD_BREAK_LIMIT":
      return {
        timeObject: { ...state.timeObject, breakLimit: action.breakLimit },
      };
    case "ADD_BIG_BREAK_LIMIT":
      return {
        timeObject: {
          ...state.timeObject,
          bigBreakLimit: action.bigBreakLimit,
        },
      };
    default:
      return state;
  }
};

export default reducer;
