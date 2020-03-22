import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/';

export const Login: React.FC<any> = (props: any) => {
  const [token, setToken] = React.useState<string>("");
  const { state, dispatch } = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    if (state.isLoggedIn) {
      history.push("/dashboard");
    }
  }, [state.isLoggedIn, history]);

  const login = () => {
    localStorage.setItem("token", `Bearer ${token}`);

    dispatch({
      type: "LOGIN",
      payload: {
        token
      }
    })
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Please enter your token"
        onChange={(e: any) => setToken(e.target.value)}
      />
      <button
        disabled={!token}
        onClick={login}
      >
        LOGIN
      </button>
    </div>
  )
};
