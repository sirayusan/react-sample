import { useState } from 'react';
import './App.css';
import useSWR from 'swr';

// 'user'オブジェクトの型を定義
interface User {
  UserID: number;
  LastName: string;
  FirstName: string;
}

function App() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('http://localhost:8080/user/index', fetcher);
  console.log("aaaa")
  console.log(data)
  const [count, setCount] = useState(0);

  // ローディング状態とエラー状態の判断
  const isLoading = !data && !error;

  return (
    <>
      {error && <div>データの読み込みに失敗しました。</div>}
      {isLoading ? (
        <div>読み込み中...</div>
      ) : (
        <div>
          {data.user_list.map((user: User) => (
            <div key={user.UserID} >ID{user.UserID}番こんにちは、 、{user.LastName} {user.FirstName}さん!</div>
          ))}
          <div className="card">
            <button onClick={() => setCount(count + 1)}>
              カウントは {count} です
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
