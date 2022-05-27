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
    <div >
      <nav className="navbar navbar-dark " style={{backgroundColor:"#6A2F85", marginTop:"-3.5rem"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      SLkart Admin
    </a>
  </div>
</nav>
   <div className="d-flex justify-content-center align-items-center" style={{height:"51rem",}}>
     <div className="d-flex p-5" style={{flexDirection:"column",width:'30%',height:'45%',boxShadow:'0px 4px 16px rgba(106, 47, 133, 0.18)',borderRadius:'15px'}}>
    
     <form >
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
  </div>
  {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div> */}
  
</form>
<button type="submit" className="btn btn-primary" onClick={()=>loginApi()} style={{width:'100%'}} >SignIn</button>

  
      </div>
      </div>
    </div>
  );
};

export default Login;
