import { SignIn, SignUp } from "./component/Authpage";
import { postRequest } from "@/lib/httpMethods";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";

export default function Home() {
  const [{ showSigninOption }, dispatch] = useStateProvider();
  const { push } = useRouter();

  const submit = async (data) => {
    const { type, confirmPassword, ...formData } = data;
    const response = await postRequest(`/auth/${type}`, formData);
    if (response) {
      push("/dashboard");
    }
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="w-96 rounded-lg shadow-lg p-10 bg-gray-100">
        <div className="grid place-items-center">
          <img src="/Color_logo.png" alt="logo" className="w-36" />
        </div>
        <SignIn
          showSigninOption={showSigninOption}
          submit={submit}
          dispatch={dispatch}
        />
        <SignUp
          showSigninOption={showSigninOption}
          submit={submit}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}
