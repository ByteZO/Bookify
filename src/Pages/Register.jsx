import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../Context/FireBaseContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [emial, setEmial] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fireBaseContext = useFirebase();

  const registerWithGoogle = () => {
    return fireBaseContext.loginWithGoogle();
  };

  const signUPhandler = async (e) => {
    e.preventDefault();
    console.log(emial, password);
    await fireBaseContext
      .signUpUserWithEmailAndPassword(emial, password)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((data) => {
        console.log(data.message);
      });
  };

  return (
    <div className="container m-5 ">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            onChange={(e) => {
              setEmial(e.target.value);
            }}
            value={emial}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={signUPhandler}>
          Sign Up
        </Button>
      </Form>
      <h1 className="mt-5 mb-5">OR</h1>
      <button onClick={registerWithGoogle}>Register with Google</button>
    </div>
  );
};
