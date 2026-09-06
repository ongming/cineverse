import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="w-full max-w-full mx-auto min-h-screen bg-[#080808]">
          <AppRoutes />
        </div>
      </AuthProvider>
       <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default App;
