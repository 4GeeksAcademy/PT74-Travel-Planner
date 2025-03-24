import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const AuthOrRedirect = ({to, children}) => {
    const { store } = useGlobalReducer();
    const nav = useNavigate();

    useEffect(() => {
        if (!store.authToken) {
            console.log("Ding!");
            nav(to ? to : "/");
        }
    }, []);

    return <>
        {children}
    </>
}

const AuthOrNone = ({children}) => {
    const { store } = useGlobalReducer();

    return <>
        {store.authToken ? children : ""}
    </>
}

const AuthedOrUnauthed = ({authed, unauthed}) => {
    const { store } = useGlobalReducer();

    return <>
        {store.authToken ? authed : unauthed}
    </>
}

export {
  AuthOrRedirect,
  AuthOrNone,
  AuthedOrUnauthed,
};