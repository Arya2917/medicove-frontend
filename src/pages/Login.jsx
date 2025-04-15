import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Add useEffect to clear form data and check for success message
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");

    // Check if redirected from registration with success message
    if (location.state?.message) {
      setSuccess(location.state.message);
      // Clear location state to prevent message appearing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.pathname]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    // Log the environment variables to check if they're correctly set
    console.log("Base URL:", import.meta.env.VITE_BASE_API_URL);
    console.log("Login API Path:", import.meta.env.VITE_USER_LOGIN_API);
  
    const loginUrl = `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_USER_LOGIN_API}`;
    console.log("Constructed Login URL:", loginUrl);
  
    try {
      // Call the API
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Call the login function from useAuth to set the user session
        await login({ token: data.token, email });
        navigate("/");
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full flex rounded-xl shadow-lg overflow-hidden">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 bg-white p-10 space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Login to your account to Share Your Knowledge, express yourself
              and share your passion
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md -space-y-px">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Not a member yet?{" "}
              <Link
                to="/register"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block w-1/2 bg-teal-600 relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white">
            <img
              src="/images/hospital-logo.jpg"
              alt="Hospital Logo"
              className="h-20 w-auto mb-8"
            />
            <h3 className="text-2xl font-bold mb-4">
              Healthcare at Your Fingertips
            </h3>
            <p className="text-center text-lg mb-6">
              Access world-class healthcare services and connect with top
              medical professionals.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Book appointments with top doctors
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Access your medical records securely
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Consult with specialists online
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Get personalized health recommendations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
