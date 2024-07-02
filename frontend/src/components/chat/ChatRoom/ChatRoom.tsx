import React, { useEffect, useState } from "react";
import { socket } from "../../../socket.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/index.ts";
import {
  ChatContainer,
  MessagesContainer,
  Message,
  InputContainer,
  Label,
  Input,
  Button,
} from "./styled.tsx";

const messagesFromDB = [
  { username: "John", message: "Hello, John!" },
  { username: "Jane", message: "Hi, Jane!" },
  { username: "John", message: "How are you?" },
  { username: "Jane", message: "I'm good, thanks!" },
];

const ChatWindow: React.FC = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(messagesFromDB);

  useEffect(() => {
    socket.on("chat message", (data) => {
      console.log("message: ", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    socket.emit("chat message", { username: username, message: message });
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
