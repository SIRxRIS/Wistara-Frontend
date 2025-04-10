import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Username validation
    if (username.length < 5) {
      setError("Username minimal 5 karakter");
      return;
    }
    
    if (username.length > 20) {
      setError("Username maksimal 20 karakter");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }
    
    if (password.length > 20) {
      setError("Password maksimal 20 karakter");
      return;
    }

    // If all validations pass
    setError("");
    setIsFormValid(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#ffffff] relative"
      style={{
        backgroundImage: "url('/images/bromo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white/95 rounded-3xl overflow-hidden flex max-w-6xl w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative">
        {/* Back button */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/">
            <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </Link>
        </div>

        {/* Logo in top right corner */}
        <div className="absolute top-8 right-8 z-10">
          <Image
            src="/images/logo-wistara.png"
            alt="Wistara Logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Left Side - Form */}
        <div className="w-1/2 p-12 pt-24">
          <h1 className="text-[#2B5C2E] text-4xl font-bold mb-8">Masuk</h1>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-6">
            <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors">
              <Image
                src="/images/google.png"
                alt="Google"
                width={25}
                height={25}
              />
              <span className="text-gray-700">Masuk dengan Google</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-1.5 hover:bg-gray-50 transition-colors">
              <Image
                src="/images/apple.png"
                alt="Apple"
                width={23}
                height={23}
              />
              <span className="text-gray-700">Masuk dengan Apple</span>
            </button>
          </div>

          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {isFormValid ? (
              <Link href="/main/home">
                <button
                  type="button"
                  className="w-full bg-[#2B5C2E] text-white py-3 rounded-lg hover:bg-green-800 transition-colors"
                >
                  Masuk
                </button>
              </Link>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#2B5C2E] text-white py-3 rounded-lg hover:bg-green-800 transition-colors"
              >
                Masuk
              </button>
            )}
          </form>

          <p className="mt-6 text-center text-gray-600">
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Daftar
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2">
          <div
            className="h-full bg-cover bg-center bg-dark/20"
            style={{ backgroundImage: "url('/images/bromo.png')" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
