import Register from "./Auth-Componont/Register";

import React from "react";
import MyLink from "../Components/MyLink.component";

function Auth(){
  return (
    <>
      <Register />

      <MyLink to="/auth/register">Register</MyLink>
      <MyLink to="/auth/login">Login</MyLink>
    </>
  );
};
export default Auth;
