import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import schema from "../validations/LoginValidations";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const sendData = async (data) => {
    try {
      setError("");

      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        data
      );

      localStorage.setItem("token", response.data.accessToken);
      navigate("/profile");
    } catch {
      setError("Username ან password არასწორია");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(sendData)}
        className="border rounded-lg p-6 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-5">Login</h1>

        <label>Username</label>
        <input
          {...register("username")}
          className="border rounded w-full p-2 mt-1"
        />
        <p className="text-red-500 text-sm mb-3">
          {errors.username?.message}
        </p>

        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          className="border rounded w-full p-2 mt-1"
        />
        <p className="text-red-500 text-sm mb-3">
          {errors.password?.message}
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="border rounded w-full p-2"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;