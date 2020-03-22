import React from 'react';

export interface ILogin {
  type: "LOGIN",
  payload: {
    token: string,
  }
};

export interface ILogout {
  type: "LOGOUT"
};

export type UserActions = ILogin | ILogout;

export interface IUserState {
  isLoggedIn: boolean;
  token: string;
};

export interface IUserContextProps {
  state: IUserState;
  dispatch: React.Dispatch<UserActions>;
};
