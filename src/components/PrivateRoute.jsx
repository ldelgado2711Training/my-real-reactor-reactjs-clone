
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Spinner } from "./Spinner";

export const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus();

    if (checkingStatus) {
        return <Spinner/>
    }

  return loggedIn ? <Outlet/> : <Navigate to="/sign-in"/>
}
/* 
An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.  */