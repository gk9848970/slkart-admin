import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { withRouter } from "react-router";
import MyCard from "../../Components/MyCard.component";

function Register(props){
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(email, password, name, city);
    let item = { name, city, email, password };
    fetch("http://35.244.8.93:4000/api/admin/auth/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
        throw res;
      })
      .then((json) => {
        console.log(json);
        props.history.push("/auth/login");
      })
      .catch((err) => console.warn(err));
  };

  return (
    <MyCard styles={{ 
            width: "50%",
            marginLeft:"450px",
            marginTop:"100px", }}>
      <TextField
        id="standard-basic"
        label="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="City"
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={loginHandler}>SignUp</Button>
      <Button href="/auth/login">Login</Button>
    </MyCard>
  );
};
export default Register;
