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
                    rows={1}
                />
                <Button // 보내기 버튼
                    disabled={message === ""}
                    type="submit" // 버튼을 누를때 onClick이 아닌 onSubmit 이벤트가 실행됨.
                    className="send-button"
                >
                    전송
                </Button>
            </form>
        </div>
    )
}

export default InputField;
