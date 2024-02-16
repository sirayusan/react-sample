import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Config from '../config';
import Cookies from 'js-cookie';

// APIからデータを取得するための関数
const fetchData = async () => {
  const jwt = Cookies.get('jwt');
  const response = await fetch(`${Config.API_URL}/home`, {
    method: 'POST', // POSTメソッドを使用
    headers: {
      'Authorization': `Bearer `+jwt
    }
  });

  if (!response.ok) {
    const error = new Error('Network response was not ok');
    // @ts-expect-error Property 'status' does not exist on type 'Error'
    error.status = response.status;
    throw error;
  }

  return true;
};
// エラーオブジェクトの型を定義
interface ErrorResponse {
  status: number;
  message?: string;
}

export default function Root() {
  const { error, isError, isLoading } = useQuery('homeData', fetchData);

  const err = error as ErrorResponse;

  if (isError && err.status === 401) {
    return <div>認証に失敗しました。ログインしてください。</div>;
  }
  
  if (isLoading) {
    return <div>読み込み中</div>;
  }

  if (isError) {
    return <div>データの読み込み中にエラーが発生しました。</div>;
  }

  return (
    <>
      <div>ログイン成功！！おめでとう！</div>
      <Link to="/login">login page</Link>
    </>
  );
}