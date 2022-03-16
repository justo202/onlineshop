import * as ActionTypes from "../actionTypes";

export const Category = (
  state = { categories: ["all"], selected: "all", isLoading: true },
  action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SELECTED_CATEGORY:
      return { ...state, selected: action.payload, isLoading: false };
    case ActionTypes.NAVBAR_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.GET_CATEGORIES:
      return { ...state, categories: action.payload, isLoading: false };

    default:
      return state;
  }
};
