import { io } from "socket.io-client"; // io를 아까 다운 받은 socket.io-client에서 들고옴.
const socket = io("https://mbtichat.onrender.com/"); // 연결하고 싶은 백엔드 주소
export default socket; // 소켓을 원하는데서 사용할수있게 export
