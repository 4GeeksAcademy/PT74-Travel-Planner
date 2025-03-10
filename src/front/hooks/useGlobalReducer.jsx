import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";  // Import the reducer and the initial state.

export const Context = createContext();  // Fix Context Name

// Define a provider component that encapsulates the store and wraps it in a context provider.
export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    return (
        <Context.Provider value={{ store, dispatch }}>  {/* Use 'Context' here */}
            {children}
        </Context.Provider>
    );
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    return useContext(Context);
}
