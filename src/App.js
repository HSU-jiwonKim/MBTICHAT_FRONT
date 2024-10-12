import React, { useEffect, useState } from 'react';
import socket from "./server"; // 소켓 들고오기
import "./App.css";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import Modal from "./Modal"; // 모달 컴포넌트 추가

function App() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태 추가

    const handleUserNameSubmit = (userName) => {
        socket.emit("login", userName, (res) => {
            console.log("Response from server:", res);
            if (res?.ok) {
                setUser(res.data);
            } else {
                console.error("Login error:", res.error);
            }
        });
    };

    useEffect(() => {
        socket.on("message", (message) => {
            setMessageList((prevState) => [...prevState, message]);
        });

        socket.on("userCount", (count) => {
            setUserCount(count);
        });

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("message");
            socket.off("userCount");
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit("sendMessage", message, (res) => {
            console.log("sendMessage response", res);
        });
        setMessage('');
    };

    return (
        <div className="App">
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} onSubmit={handleUserNameSubmit} />
            )}
            <MessageContainer messageList={messageList} user={user} userCount={userCount} />
            <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
}

export default App;
