// "use client";
// npm install socket.io-client
// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// let socket: Socket;

// export default function Home() {
//     const [status, setStatus] = useState("Connecting...");

//     useEffect(() => {
//         // Initialize connection to FastAPI
//         socket = io("http://localhost:8000");

//         socket.on("connect", () => setStatus("Connected to Socket.io"));
//         socket.on("response", (data) => console.log("Server says:", data.message));

//         return () => { socket.disconnect(); };
//     }, []);

//     const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file && socket) {
//             // Socket.io handles Blobs/Buffers automatically
//             // We emit an event named "send_image"
//             socket.emit("send_image", file);
//         }
//     };

//     return (
//         <div className="p-10">
//             <h1 className={status === "Connected" ? "text-green-500" : "text-red-500"}>
//                 {status}
//             </h1>
//             <input type="file" accept="image/*" onChange={uploadImage} />
//         </div>
//     );
// }