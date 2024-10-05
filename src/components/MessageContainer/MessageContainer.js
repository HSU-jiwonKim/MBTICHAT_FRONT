import React from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList = [], user }) => {
    console.log("User in MessageContainer:", user); // MessageContainer에서 user 로그 추가

    return (
        <div>
            {messageList.map((message, index) => {
                const userName = message?.user?.name || "Unknown"; // user가 정의되지 않은 경우 처리

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
                                    style={
                                        index === 0 ||
                                        messageList[index - 1]?.user?.name === user?.name ||
                                        messageList[index - 1]?.user?.name === "system"
                                            ? { visibility: "visible" }
                                            : { visibility: "hidden" }
                                    }
                                    alt="profile"
                                />
                                <div className="your-message">{message.chat}</div>
                            </div>
                        )}
                    </Container>
                );
            })}
        </div>
    );
};

export default MessageContainer;
