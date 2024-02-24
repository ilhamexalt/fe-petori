import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import User from "./pages/User";
import Store from "./pages/Store";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
