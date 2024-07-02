import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 50%;
  margin: 0 auto;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 16px;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

export const Message = styled.div`
  margin-bottom: 8px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-right: 8px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
