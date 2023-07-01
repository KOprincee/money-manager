import { createContext, useReducer } from "react";

const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };

    case "ADD_USER_DET":
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        token: action.payload.token,
        budget: action.payload.budget,
      };

    default:
      return state;
  }
};

const initialState = {
  name: "",
  id: "",
  token: "",
  budget: 0,
  expenses: [],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        budget: state.budget,
        expenses: state.expenses,
        id: state.id,
        token: state.token,
        name: state.name,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
