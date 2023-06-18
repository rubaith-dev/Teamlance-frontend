import React from "react";
import { useForm } from "react-hook-form";
import ACTIONS from "@/context/Actions";

const SignIn = ({ showSigninOption, submit, dispatch }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ userName: "", password: "" });

  return (
    <div className={`${showSigninOption ? "block" : "hidden"}`}>
      <form onSubmit={handleSubmit((data) => submit({ ...data, type: "signin" }))} noValidate className="mt-5">
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-primary-600 bg-white shadow-lg rounded-md"
          placeholder="Username"
          {...register("userName", {
            required: "User Name is required",
          })}
        />
        <p className="text-red-800 mt-2">{errors?.userName?.message}</p>

        <input
          type="password"
          className="w-full px-4 py-2 focus:outline-primary-600 bg-white shadow-lg rounded-md"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters long",
            },
          })}
        />
        <p className="text-red-800 mt-2">{errors?.password?.message}</p>
        <button type="submit" className="bg-primary-700 text-white p-2 rounded-md w-full mt-2 shadow-lg">
          Submit
        </button>
      </form>

      <p className="mt-5 text-gray-500 text-lg text-center">Don't have any Account?</p>
      <button
        className="bg-primary-700 text-white p-2 rounded-md w-full mt-2 shadow-lg"
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_AUTH_MODAL, payload: false })}
      >
        Create Account
      </button>
    </div>
  );
};

export default SignIn;
