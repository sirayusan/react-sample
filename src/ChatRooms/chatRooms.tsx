import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Config from '../config';
import Cookies from 'js-cookie';

// APIからデータを取得するための関数
const fetchData = async () => {
  const jwt = Cookies.get('jwt');
  const response = await fetch(`${Config.API_URL}/chats`, {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  });

  if (!response.ok) {
    const error = new Error('Network response was not ok') as ErrorResponse;
    error.status = response.status;
    throw error;
  }

  return await response.json();
};

// エラーオブジェクトの型を定義
interface ErrorResponse extends Error {
  status: number;
}

// APIレスポンス内のチャットアイテムの型を定義
interface ChatItem {
  chat_room_id: number
  user_name: string;
  message: string;
  created_at: string;
}

// APIレスポンスの型を定義
interface ApiResponse {
  List: ChatItem[];
}

export default function ChatRooms() {
  const { error, isError, isLoading, data } = useQuery<ApiResponse>('homeData', fetchData);

  const err = error as ErrorResponse;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    };
    return new Date(dateString).toLocaleDateString('ja-JP', options).replace(/\//g, '-').replace('T', ' ');
  };

  if (isError && err.status === 401) {
    return <div>認証に失敗しました。ログインしてください。</div>;
  }

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (isError) {
    return <div>データの読み込み中にエラーが発生しました。</div>;
  }

  return (
      <>
        <section>
          <div>チャット一覧</div>
          <div className="flex justify-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24">
            <div className="flex flex-col items-center w-full max-w-7xl">
              {data?.List.map((chat: ChatItem, index: number) => (
                  <Link to={"/chat-rooms/"+chat.chat_room_id} className="flex min-w-[400px] w-full max-w-md p-6 bg-white shadow-lg rounded-lg mb-6" key={index}>
                    <img alt="user icon" className="w-10 h-10 rounded-full mr-4" src="https://via.placeholder.com/200x200" />
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-medium text-gray-900 truncate">{chat.user_name}</span>
                        <span className="text-xs text-gray-500">{formatDate(chat.created_at)}</span>
                      </div>
                      <p className="text-gray-700 text-left truncate">{chat.message.length > 20 ? `${chat.message.substring(0, 20)}...` : chat.message}</p>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        </section>
        <Link to="/login">ログインページへ</Link>
      </>
  );
}