import * as ActionTypes from "../actionTypes";

export const Currency = (
  state = {
    currency: [""],
    selected: { symbol: "$", label: "USD" },
    isLoading: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SELECTED_CURRENCY:
      return { ...state, selected: action.payload, isLoading: false };
    case ActionTypes.NAVBAR_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.GET_CURRENCY:
      return { ...state, currency: action.payload, isLoading: false };

    default:
      return state;
  }
};
