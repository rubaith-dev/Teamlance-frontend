import "@/styles/globals.css";
import Layout from "./component/Layout";
import { StateProvider } from "@/context/StateContext";
import { reducer, initialState } from "@/context/StateReducers";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient, Hydrate } from "@tanstack/react-query";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const data = pageProps;
  const { authenticated } = data;

  const [queryClient] = useState(() => {
    return new QueryClient();
  });
  return (
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
  );
}
