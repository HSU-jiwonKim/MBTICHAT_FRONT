import React, { useState } from 'react';
import './Modal.css'; // 스타일 파일 추가

const Modal = ({ onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태 추가

    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 폼 제출 방지
        onSubmit(inputValue, profileImage); // 사용자 이름과 프로필 이미지 전송
        onClose(); // 모달 닫기
    };

    const handleImageChange = (event) => {
        setProfileImage(event.target.files[0]); // 선택된 파일 상태 업데이트
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>이름과 프로필 이미지 입력</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="당신의 이름을 입력하세요"
                />
                <input
                    type="file"
                    onChange={handleImageChange} // 이미지 변경 핸들러
                    accept="image/*" // 이미지 파일만 선택 가능
                />
                <button onClick={handleSubmit}>확인</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

export default Modal;
