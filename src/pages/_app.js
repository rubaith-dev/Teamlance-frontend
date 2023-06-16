import "@/styles/globals.css";
import Layout from "./component/Layout";
import { StateProvider } from "@/context/StateContext";
import { reducer, initialState } from "@/context/StateReducers";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient


export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider initialState={initialState} reducer={reducer}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </StateProvider>
    </QueryClientProvider>
    
  );
}
