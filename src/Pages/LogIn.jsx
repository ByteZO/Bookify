import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../Context/FireBaseContext";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const fireBaseContext = useFirebase();
  const handleGooglelogIn = () => fireBaseContext.loginWithGoogle();
  const HandleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fireBaseContext.logInwithEmailandPassword(
        email,
        password
      );
      response ? console.log(response) : null;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fireBaseContext.isLoggedIn ? navigate("/") : null;
    console.log("good");
  }, [navigate, fireBaseContext.isLoggedIn]);

  return (
    <div className="cantainer mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
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
        <Button variant="primary" type="submit" onClick={HandleLogIn}>
          Log In
        </Button>
      </Form>
      <h1 className="mt-5 mb-5">OR</h1>
      <button onClick={handleGooglelogIn}>Login With Google</button>
    </div>
  );
};

export default LogIn;
