import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface FormData {
  mail: string;
  password: string;
  rememberMe: boolean;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState('');

  // ログイン処理を行う関数
  const login = async (formData: FormData) => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      throw new Error('ログインに失敗しました');
    }
  
    const data = await response.json(); // レスポンスのJSONを解析
  
    // トークンをクッキーに保存
    Cookies.set('jwt', data.jwt, { expires: 7 }); // トークンを 'jwt' という名前でクッキーに保存し、有効期限を7日間に設定
  
    return data;
  };

  // useMutationを使用してログイン処理を実行
  const { mutate } = useMutation(login, {
    onSuccess: () => {
      navigate('/home'); // ログイン成功時に/homeに遷移
    },
    onError: (error: Error) => {
      setLoginStatus(error.message); // エラー時にメッセージを設定
    },
  });

  const onSubmit = (formData: FormData) => {
    mutate(formData); // フォームの送信データをmutate関数に渡す
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="mail" className="block text-sm font-medium text-neutral-600">
              {' '}
              Email address{' '}
            </label>
            <div className="mt-1">
              <input
                id="mail"
                {...register('mail', { required: true })}
                type="mail"
                autoComplete="mail"
                placeholder="Your mail"
                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
              />
              {errors.mail && <span className="text-red-500">Emailを入力してください。</span>}
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-600">
              {' '}
              Password{' '}
            </label>
            <div className="mt-1">
              <input
                id="password"
                {...register('password', { required: true })}
                type="password"
                autoComplete="current-password"
                placeholder="Your Password"
                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
              />
              {errors.password && (
                <span className="text-red-500">パスワードを入力してください。</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                {...register('rememberMe')}
                type="checkbox"
                placeholder="Your password"
                className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-neutral-600">
                {' '}
                Remember me{' '}
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                {' '}
                Forgot your password?{' '}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
        {loginStatus && <div>{loginStatus}</div>}
      </div>
    </>
  );
}

export default Login;
