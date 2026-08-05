import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="w-full max-w-full mx-auto min-h-screen bg-[#080808]">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
