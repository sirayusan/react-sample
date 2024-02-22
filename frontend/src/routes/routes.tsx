import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import ErrorPage from "../error-page";
import Login from "../Auth/Login";
import ChatRooms from "../ChatRooms/chatRooms.tsx";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat-rooms" element={<ChatRooms />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </QueryClientProvider>
  );
}
