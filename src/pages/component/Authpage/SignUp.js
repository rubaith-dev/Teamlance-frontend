import { useForm } from "react-hook-form";
import ACTIONS from "@/context/Actions";

const SignUp = ({ showSigninOption, submit, dispatch }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({ userName: "", password: "", signup: true });

  const password = watch("password");

  return (
    <div className={`${showSigninOption ? "hidden" : "block"} grid place-items-center`}>
      <form onSubmit={handleSubmit((data) => submit({ ...data, type: "signup" }))} noValidate className="mt-5 w-full">
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
          type="text"
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

        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-primary-600 bg-white shadow-lg rounded-md"
          placeholder="confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />

        <p className="text-red-800 mt-2">{errors?.confirmPassword?.message}</p>
        <button type="submit" className="bg-primary-700 text-white p-2 rounded-md w-full mt-2 shadow-lg">
          Submit
        </button>
      </form>

      <p className="mt-5 text-gray-500 text-lg text-center">Already Have Account?</p>
      <button
        className="bg-primary-700 text-white p-2 rounded-md w-full mt-2 shadow-lg"
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_AUTH_MODAL, payload: true })}
      >
        Switch to Signin
      </button>
    </div>
  );
};

export default SignUp;
