import "@/styles/globals.css";
import Layout from "./component/Layout";
import { StateProvider } from "@/context/StateContext";
import { reducer, initialState } from "@/context/StateReducers";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient, Hydrate } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const data = pageProps;
  const { authenticated } = data;

  const [queryClient] = useState(() => {
    return new QueryClient();
  });

  const [title, setTitle] = useState();
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/dashboard") {
      setTitle("Teamlance || Dashboard");
    } else {
      setTitle("Teamlance || Homepage");
    }
  });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <StateProvider initialState={initialState} reducer={reducer}>
            {authenticated ? (
              <Layout>
                <Component {...pageProps} />
                <ToastContainer />
              </Layout>
            ) : (
              <>
                <Component {...pageProps} />
                <ToastContainer />
              </>
            )}
          </StateProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
