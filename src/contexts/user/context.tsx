import React from 'react';
import { IUserContextProps } from './types';
import { reducer, initialState } from './reducer';

export const UserContext = React.createContext({} as IUserContextProps);

export const UserContextProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch({
        type: "LOGIN",
        payload: {
          token: `Bearer ${token}`
        }
      })
    }

    const timeOut = setTimeout(() => {
      setInitialized(true);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    }
  }, [dispatch]);

  const value = React.useMemo(() => {
    return  { state, dispatch }
  }, [state, dispatch]);

  return (
    <UserContext.Provider value={value}>
      {initialized ? props.children : <p>Wait please</p>}
    </UserContext.Provider>
  )
};