import SignIn from "./component/Authpage/SignIn";
import SignUp from "./component/Authpage/SignUp";
import { postRequest } from "@/lib/httpMethods";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import ACTIONS from "@/context/Actions";
import { destroyCookie } from "nookies";
import checkAuthSSR from "@/lib/checkAuthSSR";

export default function Home() {
  const [{ showSigninOption }, dispatch] = useStateProvider();
  const { push } = useRouter();

  // Signin/Signup Handler
  const submit = async (data) => {
    const { type, confirmPassword, ...formData } = data;
    const response = await postRequest(`/auth/${type}`, formData);
    if (response) {
      dispatch({ type: ACTIONS.SET_USER_INFO, payload: response.data });
      push("/dashboard");
    }
  };

  return (
    <div className="w-full h-screen grid place-items-center">
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
  const { req, res } = context;
  const token = req.cookies["access-token"];

  const authenticated = await checkAuthSSR(token, res);
  if (!authenticated) {
    destroyCookie({ res }, "access-token");
  } else {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {
      data: { authenticated },
    },
  };
}
