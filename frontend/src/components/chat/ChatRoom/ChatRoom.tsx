import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/index.ts";
import { ChatContainer, MessagesContainer, Message, InputContainer, Label, Input, Button } from "./styled.tsx";

const messages = [
  { username: "John", message: "Hello, John!" },
  { username: "Jane", message: "Hi, Jane!" },
  { username: "John", message: "How are you?" },
  { username: "Jane", message: "I'm good, thanks!" },
];

const ChatWindow: React.FC = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("message: ", message);
    setMessage("");
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index}>
            <b>{msg.username}:</b> {msg.message}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Label>{username}:</Label>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSubmit}>Send</Button>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatWindow;
