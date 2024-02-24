import  { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

// メッセージの型を定義
interface Message {
    user_name: string;
    message: string;
    created_at: string;
}

function Chat() {
    const [messages, setMessages] = useState<Message[]>([]); // Message型の配列に変更
    const [messageToSend, setMessageToSend] = useState('');
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const { id } = useParams();

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hour12: false
        };
        return new Date(dateString).toLocaleDateString('ja-JP', options).replace(/\//g, '-').replace('T', ' ');
    };

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8080/chats/${id}`);

        ws.onopen = () => console.log('WebSocket接続が確立されました。');
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data); // JSON形式のメッセージをパース
            console.log(message); // 受信したメッセージオブジェクトをコンソールに表示
            setMessages((prevMessages) => [...prevMessages, message]); // Messageオブジェクトの配列として保存
        };
        ws.onerror = (error) => console.error('WebSocketエラー:', error);

        setWebSocket(ws);

        return () => ws.close();
    }, [id]);

    const sendMessage = () => {
        if (webSocket && messageToSend) {
            webSocket.send(messageToSend);
            setMessageToSend('');
        }
    };

    return (
        <div>
            <Link to="/chat-rooms">戻る</Link>
            <h2>チャット</h2>
            <div>
                {messages.map((message) => (
                    <>
                        <p>送信者:{message.user_name} 送信時間: {formatDate(message.created_at)}</p>
                        <p>{message.message}</p>
                    </>
                ))}
            </div>
            <input
                type="text"
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
                placeholder="メッセージを入力"
            />
            <button onClick={sendMessage}>送信</button>
        </div>
    );
}

export default Chat;
