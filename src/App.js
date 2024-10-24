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
        
        // 사용자 메시지를 서버에 전송
        socket.emit("sendMessage", message, (res) => {
            console.log("sendMessage response", res);
        });
        
        // GPT API 요청
        fetch("https://mbtichat-backend.onrender.com/api/chat", { // 백엔드 API 엔드포인트로 수정
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        })
        .then(response => response.json())
        .then(data => {
            // GPT의 응답을 메시지 목록에 추가
            const gptMessage = {
                chat: data.reply,
                user: { id: null, name: "GPT" }, // 메시지 출처를 구분하기 위해
            };
            setMessageList((prevState) => [...prevState, gptMessage]);
        })
        .catch(error => {
            console.error("Error fetching GPT response:", error);
        });

        setMessage(''); // 메시지 입력창 초기화
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
