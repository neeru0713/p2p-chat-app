import React, { useState } from "react";
import { PiDotsNineLight } from "react-icons/pi";
import { PiChatSlashBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config.js";
import { useSocket } from "../SocketProvider.jsx";

const SignUp = () => {
  const { socket } = useSocket();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Sign up failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user._id);
      socket?.emit("userOnline", data.user._id);

      navigate("/chat");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <form
        className="flex flex-col relative gap-6 border rounded-xl border-gray-200 m-auto shadow shadow-lg mt-[5%] p-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <div className="flex flex-row-reverse">
            <PiDotsNineLight className="text-right text-5xl text-[#6e80a4]" />
          </div>

          <div className="flex items-center m-auto gap-1">
            <PiChatSlashBold className="text-3xl" />
            <h2 className="text-center text-3xl">Chat</h2>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-md border-gray-300 p-2 text-sm text-gray-500 w-[20rem]"
            required
          />

          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border rounded-md border-gray-300 p-2 text-sm text-gray-500 w-[20rem]"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border rounded-md border-gray-300 p-2 text-sm text-gray-500 w-[20rem]"
            required
          />

          {error && (
            <p className="text-red-500 p-4 bg-red-50 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="border rounded-md border-gray-300 p-2 text-sm text-white w-[20rem] bg-[#6e80a4]"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="text-sm">
            Existing user ?{" "}
            <Link
              to="/signin"
              className="underline text-blue-500 hover:text-blue-700"
            >
              Sign In
            </Link>
          </p>
        </div>

        <PiDotsNineLight className="text-5xl text-[#6e80a4]" />
      </form>
    </div>
  );
};

export default SignUp;
