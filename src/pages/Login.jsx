import React from "react";
import { LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, loading } = useAuth();

  const handleLogin = () => {
    console.log("Login clicked, redirecting to Auth0 with redirect_uri:", window.location.origin);
    login();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 top-1/3 right-1/4 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="relative z-10 max-w-md w-full p-6 bg-black/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">Login to Udaan AI</h1>
          <p className="mt-2 text-gray-400">Access your career guidance platform</p>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : (
            <LogIn className="w-5 h-5 mr-2" />
          )}
          {loading ? "Redirecting..." : "Sign In with Auth0"}
        </button>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;