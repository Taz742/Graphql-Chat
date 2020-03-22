import React from 'react';
import { IUserState, UserActions } from "./types";

export const initialState: IUserState = {
  isLoggedIn: false,
  token: ""
};

export const reducer: React.Reducer<IUserState, UserActions> = (state, action) => {
  switch(action.type) {
    case "LOGIN": {
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token
      }
    }

    case "LOGOUT": {
      return {
        ...initialState
      }
    }

    default: {
      return state;
    }
  }
};
