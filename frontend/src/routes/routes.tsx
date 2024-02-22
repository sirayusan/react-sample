import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import ErrorPage from "../error-page";
import Login from "../Auth/Login";
import Home from "../Hoom/home";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </QueryClientProvider>
  );
}
