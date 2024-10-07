import React from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList = [], user, userCount }) => {
    return (
        <div className="message-container-wrapper"> {/* 전체 컨테이너 */}
            <h5 className="user-count">그룹채팅 <span className="user-count-number">{userCount}</span></h5> {/* 사용자 수 표시 */}
            <div className="message-scroll-container"> {/* 스크롤 컨테이너 */}
                {messageList.map((message) => {
                    const userName = message?.user?.name || "Unknown";

                    return (
                        <Container key={message._id} className="message-container">
                            {userName === "system" ? (
                                <div className="system-message-container">
                                    <p className="system-message">{message.chat}</p>
                                </div>
                            ) : userName === user?.name ? (
                                <div className="my-message-container">
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
                                    <div className="timestamp">
                                        {new Date(message.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })} 
                                    </div>
                                </div>
                            )}
                        </Container>
                    );
                })}
            </div>
            {/* 여기에 입력창을 추가합니다 */}
        </div>
    );
};

export default MessageContainer;
