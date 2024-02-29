import React, { createContext, useContext, useReducer } from "react";

// state provider using React Context API

const AppStateContext = createContext();

const initialState = {
    reqStatus: "",
    user: {
        email: "",
        firstname: "",
        lastname: "",
    }
};

const SET_REQ_STATUS = "SET_REQ_STATUS";
const SET_USER = "SET_USER";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_REQ_STATUS:
            return { ...state, reqStatus: action.payload };
        case SET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export function AppStateProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const setReqStatus = (status) => {
        dispatch({ type: SET_REQ_STATUS, payload: status });
    };

    const setUser = (userData) => {
        dispatch({ type: SET_USER, payload: userData });
    };

    return (
        <AppStateContext.Provider
            value={{
                state,
                setReqStatus,
                setUser,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error("useAppState must be used within an AppStateProvider");
    }
    return context;
}
