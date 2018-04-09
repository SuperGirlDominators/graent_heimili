import * as actionTypes from "../actionTypes/actionTypes";

const initState = {
  isRequestingUserChecklist: false,
  userchecklist: [],
};

export default (state = initState, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.REQUEST_USER_CHECKLIST:
      return {...state, isRequestingUserChecklist: true};
    case actionTypes.RECEIVE_USER_CHECKLIST:
      return {...state, isRequestingUserChecklist: false, userchecklist: action.userchecklist };
    default:
      return state;
  }
}
