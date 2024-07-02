import React, { useState } from "react";
import { LoginContainer, Heading, Form, Label, Input, Button } from "./styled";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsername as setUsernameRedux } from "../../../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        }
      );
      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      dispatch(setUsernameRedux(response.data.username));
      navigate("/chat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginContainer>
      <Heading>Login</Heading>
      <Form onSubmit={onSubmit}>
        <Label>
          Username
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Label>
        <Label>
          Password
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Label>
        <Button type="submit">Login</Button>
      </Form>
    </LoginContainer>
  );
};

export default Login;
