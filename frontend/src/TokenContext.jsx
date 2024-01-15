import { createContext, useReducer, useContext } from "react";

const initialState = {
  token: null,
  username: null,
  id: null,
};

const tokenReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_ID":
      return { ...state, id: action.payload };
    default:
      return state;
  }
};

const TokenContext = createContext();

export const tokenContextProvider = ({ children }) => {
  const [tokenState, tokenDispatch] = useReducer(tokenReducer, initialState);

  return (
    <TokenContext.Provider value={{ tokenState, tokenDispatch }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenValue = () => {
  const stateAndDispatch = useContext(TokenContext);
  return stateAndDispatch[0];
};

export const useTokenDispatch = () => {
  const stateAndDispatch = useContext(TokenContext);
  return stateAndDispatch[1];
};

export default TokenContext;
