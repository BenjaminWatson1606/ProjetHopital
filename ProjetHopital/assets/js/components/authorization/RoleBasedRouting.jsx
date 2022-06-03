import jwtDecode from "jwt-decode";
import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Unauthorized from "./Unauthorized"

const token = window.localStorage.getItem("authToken");
const { roles: roles } = jwtDecode(token);

function RoleBasedRouting({
    component: Component, roles, ...rest
  }) {
    return (
      <>
        { grantPermission(roles) && (
        <Route
          {...rest}
          render={(props) => (
            <>
              <Component {...props} />
            </>
          )}
        />
        )}
        {
          !grantPermission(roles) && (
            <Route
              render={() => (
                <>
                  <Unauthorized /> 
                </>
              )}
            />
          )
        }
      </>
    );
  }

  export const grantPermission = (requestedRole) => {
   // in case of multiple roles, if one of the permittedRoles is present in requestedRoles, return true;
    // return false;
    if (roles.find(role => role===requestedRole)){
      return true
    } else {
      return false
    }
    
  };

  export default RoleBasedRouting;