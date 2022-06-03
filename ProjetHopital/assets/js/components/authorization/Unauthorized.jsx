import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";

function Unauthorized() {
    return (
        toast.error("You are not authorized to go on this page."),
        <Route
            path="/login"
            render={(props) => (
            <Login onLogin={setIsAuthenticated} {...props} />
            )}
        />
    );
  }

export default Unauthorized;