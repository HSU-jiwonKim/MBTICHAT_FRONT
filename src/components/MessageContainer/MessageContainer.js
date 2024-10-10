// MessageContainer.js
import React, { useEffect, useRef } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList = [], user, userCount }) => {
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    return (
        <div className="message-container-wrapper">
            <h5 className="user-count">그룹채팅 <span className="user-count-number">{userCount}</span></h5>
            <div className="message-scroll-container">
                {messageList.map((message, index) => {
                    const userName = message?.user?.name || "Unknown";
                    const messageTime = new Date(message.createdAt);
                    const currentTime = new Date();
                    const timeDifference = (currentTime - messageTime) / 1000; // 초 단위로 계산

                    // 시간 표시 여부 결정
                    const showTime = index === 0 || (timeDifference >= 60 && messageList[index - 1]?.user?.name === userName); // 첫 번째 메시지 또는 1분 이상 경과한 경우, 이전 메시지가 같은 사용자일 때만 시간 표시

                    return (
                        <Container key={message._id} className="message-container">
                            {userName === "system" ? (
                                <div className="system-message-container">
                                    <p className="system-message">{message.chat}</p>
                                </div>
                            ) : userName === user?.name ? (
                                <div className="my-message-container">
                                    {showTime && (
                                        <div className="timestamp2">
                                            {messageTime.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    )}
                                    <div className="my-message">{message.chat}</div>
                                </div>
                            ) : (
                                <div className="your-message-container">
                                    <img
                                        src="/profile.jpeg"
                                        className="profile-image"
                                        alt="profile"
                                    />
                                    <div className="user-info">
                                        <div className="user-name">{userName}</div>
                                        <div className="your-message">{message.chat}</div>
                                    </div>
                                    {showTime && (
                                        <div className="timestamp">
                                            {messageTime.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Container>
                    );
                })}
                <div ref={messageEndRef} />
            </div>
        </div>
    );
};

export default MessageContainer;
