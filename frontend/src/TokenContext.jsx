import { createContext, useReducer, useContext } from "react";

const initialState = {
  token: null,
  username: null,
  id: null,
  usertype: null,
};

const tokenReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_USERTYPE":
      return { ...state, usertype: action.payload };
    default:
      return state;
  }
};

const TokenContext = createContext();

export const TokenContextProvider = (props) => {
  const [tokenState, tokenDispatch] = useReducer(tokenReducer, initialState);

  return (
    <TokenContext.Provider value={{ tokenState, tokenDispatch }}>
      {props.children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};

export default TokenContext;
