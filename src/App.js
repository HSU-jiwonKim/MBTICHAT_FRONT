import React, { useEffect, useState } from 'react';
import socket from "./server"; // 소켓 들고오기
import "./App.css";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [userCount, setUserCount] = useState(0); // 사용자 수 상태 추가

    console.log("Message List", messageList); // 메시지 리스트 로그

    const askUserName = () => {
        let userName = prompt("당신의 이름을 입력하세요");
       
        while (!userName) {
            userName = prompt("이름을 입력해야 합니다. 다시 입력하세요.");
        }
    
        console.log("User Name Entered:", userName);

        socket.emit("login", userName, (res) => {
            console.log("Response from server:", res);
            if (res?.ok) {
                setUser(res.data);
                console.log("User set:", res.data);
            } else {
                console.error("Login error:", res.error);
            }
        });
    };

    useEffect(() => {
        // 메시지를 수신하면 messageList를 업데이트
        socket.on("message", (message) => {
            setMessageList((prevState) => [...prevState, message]);
        });

        // 사용자 수 업데이트
        socket.on("userCount", (count) => {
            setUserCount(count); // 사용자 수 업데이트
            console.log("Updated user count:", count);
        });

        askUserName();

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
            socket.off("userCount"); // 수정된 부분
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        console.log("Sending message:", message);
        socket.emit("sendMessage", message, (res) => {
            console.log("sendMessage response", res);
        });
        setMessage(''); // 메시지 전송 후 입력 필드 비우기
    };

    return (
        <div className="App">
            <MessageContainer messageList={messageList} user={user} userCount={userCount} /> {/* 사용자 수 전달 */}
            <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
}

export default App;
