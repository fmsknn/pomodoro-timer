export const addSessionNum = ({ sessionNum }) => {
  return {
    type: "ADD_SESSION_NUM",
    sessionNum,
  };
};

export const addWorkLimit = ({ time }) => {
  return {
    type: "ADD_WORK_LIMIT",
    workLimit: time,
  };
};

export const addBreakLimit = ({ time }) => {
  return {
    type: "ADD_BREAK_LIMIT",
    breakLimit: time,
  };
};

export const addBigBreakLimit = ({ time }) => {
  return {
    type: "ADD_BIG_BREAK_LIMIT",
    bigBreakLimit: time,
  };
};
