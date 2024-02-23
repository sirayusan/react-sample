import  { useState, useEffect } from 'react';

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageToSend, setMessageToSend] = useState('');
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080/chats/1');

        ws.onopen = () => console.log('WebSocket接続が確立されました。');
        ws.onmessage = (event) => {
            const message = event.data;
            console.log(message); // 受信したメッセージをコンソールに表示
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        ws.onerror = (error) => console.error('WebSocketエラー:', error); // WebSocketエラーをログに出力

        setWebSocket(ws);

        return () => ws.close(); // コンポーネントのアンマウント時にWebSocketをクローズ
    }, []);

  const sendMessage = () => {
    if (webSocket && messageToSend) {
      webSocket.send(messageToSend);
      setMessageToSend(''); // メッセージ送信後に入力フィールドをクリア
    }
  };

  return (
      <div>
        <h2>チャット</h2>
        <div>
          {messages.map((message, index) => <p key={index}>{message}</p>)}
        </div>
        <input
            type="text"
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
            placeholder="メッセージを入力"
        />
        <button onClick={sendMessage}>送信</button> {/* 修正: onClickイベントには関数を直接指定 */}
      </div>
  );
}

export default Chat;
