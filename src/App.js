import { useEffect } from "react";
import socket from "./server"; // 소켓 들고오기

function App() {
    useEffect(() => {
        // 소켓 연결 상태 확인
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id); // 소켓 ID 로그
        });
        
        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    return (
        <div className="App">
            <h1>Real-time Chat Application</h1>
        </div>
    );
}

export default App;
