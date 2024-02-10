import { Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div>ログイン成功！！おめでとう！</div>
      <Link to="/login">login page</Link> {/* ルートパスへのリンク */}
    </>
  );
}
