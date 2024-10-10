import React, { useEffect, useState } from 'react';
import socket from "./server"; // 소켓 들고오기
import "./App.css";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import Modal from "./components/Modal"; // 모달 컴포넌트 가져오기

function App() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [userCount, setUserCount] = useState(0); // 사용자 수 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태를 true로 설정하여 처음에 열리게 함

    const handleUserNameSubmit = (userName) => {
        socket.emit("login", userName, (res) => {
            if (res?.ok) {
                setUser(res.data);
                setIsModalOpen(false); // 모달 닫기
            } else {
                console.error("Login error:", res.error);
            }
        });
    };

    useEffect(() => {
        // 소켓 이벤트 설정
        socket.on("message", (message) => {
            setMessageList((prevState) => [...prevState, message]);
        });

        socket.on("userCount", (count) => {
            setUserCount(count);
        });

        return () => {
            socket.off("message");
            socket.off("userCount");
            socket.off("userCount");
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit("sendMessage", message);
        setMessage(''); // 메시지 전송 후 입력 필드 비우기
    };

    return (
        <div className="App">
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} onSubmit={handleUserNameSubmit} />
            )}
            <MessageContainer messageList={messageList} user={user} userCount={userCount} />
            <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
            <button onClick={() => setIsModalOpen(true)}>이름 변경</button> {/* 모달 열기 버튼 */}
            
            {/* 모달 컴포넌트 */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUserNameSubmit}
            />
        </div>
    );
}

export default App;
