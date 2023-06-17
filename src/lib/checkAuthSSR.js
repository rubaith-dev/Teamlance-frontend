import axiosInstanceSSR from "./axiosInstanceSSR";

const checkAuthSSR = async (token, res) => {
  let isAuthenticated = false;

  // If the authentication cookie is not found, redirect to the homepage
  if (!token) {
    return isAuthenticated;
  }

  // if Token found validate it.
  try {
    const res = await axiosInstanceSSR.get("/auth/isAuthenticated", {
      headers: { Cookie: `access-token=${token}` },
    });
    if (res) {
      isAuthenticated = true;
    }
  } catch (error) {}

  return isAuthenticated;
};

export default checkAuthSSR;
