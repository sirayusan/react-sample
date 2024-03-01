import  { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import Config from '../../config';
import Cookies from 'js-cookie';

// メッセージの型を定義
interface Message {
    sender_user_id: number;
    user_name: string;
    message: string;
    created_at: string;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]); // Message型の配列に変更
    const [messageToSend, setMessageToSend] = useState('');
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [isError, setIsError] = useState(true);
    const { id } = useParams();
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hour12: false
        };
        return new Date(dateString).toLocaleDateString('ja-JP', options).replace(/\//g, '-').replace('T', ' ');
    };

    useEffect(() => {
        const jwt = Cookies.get('jwt');
        const ws = new WebSocket(`${Config.WEBSOCKET_URL}/chats/${id}?jwt=${jwt}`);

        ws.onopen = () => {
            setIsError(false)
            console.log('WebSocket接続が確立されました。');
        }
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data); // JSON形式のメッセージをパース
            console.log(message); // 受信したメッセージオブジェクトをコンソールに表示
            setMessages((prevMessages) => [...prevMessages, message]); // Messageオブジェクトの配列として保存
        };
        ws.onerror = (error) => console.error('WebSocketエラー:', error);

        setWebSocket(ws);

        return () => ws.close();
    }, [id]);

    if (isError) {
        return <div>データの読み込み中。</div>;
    }

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
                {messages.map((message,index) => (
                    <div key={index}>
                        <p>送信者:{message.user_name} ID:{message.sender_user_id} 送信時間: {formatDate(message.created_at)}</p>
                        <p>{message.message}</p>
                    </div>
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