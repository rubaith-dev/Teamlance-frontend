import SignIn from "./component/Authpage/SignIn";
import SignUp from "./component/Authpage/SignUp";
import { postRequest } from "@/lib/httpMethods";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import axiosInstanceSSR from "@/lib/axiosInstanceSSR";

export default function Home() {
  const [{ showSigninOption }, dispatch] = useStateProvider();
  const { push } = useRouter();

  const submit = async (data) => {
    const { type, confirmPassword, ...formData } = data;
    const response = await postRequest(`/auth/${type}`, formData);
    if (response) {
      dispatch({ type: ACTIONS.SET_USER_INFO, payload: response.data });
      push("/dashboard");
    }
  };

  return (
    <div className="w-full h-full grid place-items-center border border-red-900">
      <div className="w-96 rounded-lg shadow-lg p-10 bg-gray-100">
        <div className="grid place-items-center">
          <img src="/Color_logo.png" alt="logo" className="w-36" />
        </div>
        <SignIn showSigninOption={showSigninOption} submit={submit} dispatch={dispatch} />
        <SignUp showSigninOption={showSigninOption} submit={submit} dispatch={dispatch} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies["access-token"];

  if (token) {
    try {
      await axiosInstanceSSR.get("/auth/isAuthenticated", {
        headers: { Cookie: `access-token=${token}` },
      });
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      data: {},
    },
  };
}
