import React, { useState } from "react";
import { withRouter } from "react-router";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import { Button, TextField } from "@material-ui/core";
import MyCard from "../../Components/MyCard.component";

import {apiBaseUrl} from "../../Config";

function Login(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  async function loginApi(){
    const createTask = await axios.post(`${apiBaseUrl}/api/admin/auth/login`, {
    
        "email" : email,
        "password" : password
    
    });
    if(createTask.data.flag ==1)
    {alert("Login successfully");
    //setUserDAta(createTask.data);
    localStorage.setItem("token",createTask.data.token);
    console.log(createTask.data);
    history.push('/admin/dashboard');
    //console.log(createTask.data);
}
    else{
        alert(createTask.data.msg);
    }
    
}
function add(){
  console.log("hello");
}
  // const loginHandler = (e) => {
  //   e.preventDefault();
  //   let item = { email, password };

  //   fetch(`${apiBaseUrl}/api/admin/auth/login`, {
  //     method: "POST",
  //     body: JSON.stringify(item),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) return response.json();
  //       throw response;
  //     })
  //     .then((json) => {
  //       // console.log(json.token);
  //       localStorage.setItem("token", json.token);
  //       props.history.push("/admin/dashboard");
  //       console.log(json)
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <div class="login-main-container">
      <nav className="navbar navbar-dark " style={{backgroundColor:"#6A2F85"}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            SLkart Admin
          </a>
        </div>
      </nav>

    <div class="login-box">
      <div class="login-div login-div-1">
        <p class="login-text">Hey!</p>
        <p class="login-text">Welcome to Admin Panel</p>
        <img src="/img/login-page-img.png" data-retina="true" alt="Login Graphic"/>
      </div>
      <div class="login-div login-div-2">
        
      </div>
      <div class="login-div login-div-3">
        <p class="login-text text-center">Admin Login with ID/Password</p>
        <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label login-text login-label">Email Address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
            </div>
            <div className="">
              <label htmlFor="exampleInputPassword1" className="form-label login-text login-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div><a className="login-forget-link login-text" href="#">Forgot Password ?</a></div>
            {/* <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
        </form>
        <button type="submit" className="btn btn-primary login-btn-signin" onClick={()=>loginApi()} style={{width:'100%'}} >Sign In</button>
      </div>
    </div>
  </div>
  );
};

export default Login;
