import React from 'react';
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";
import './InputField.css';

const InputField = ({ message, setMessage, sendMessage }) => {
    return (
        <div className="input-area">
            <div className="plus-button">+</div>
            <form onSubmit={sendMessage} className="input-container"> 
                <Input // 입력 텍스트창
                    placeholder="Type in here…"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    multiline={false}
                    rows={1
                } 
                    className="input-field" // 클래스 추가
                />
                <Button // 보내기 버튼
                    disabled={message === ""}
                    type="submit"
                    className="send-button"
                >
                    전송
                </Button>
            </form>
        </div>
    );
}

export default InputField;
