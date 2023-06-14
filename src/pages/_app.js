import "@/styles/globals.css";
import Layout from "./component/Layout";
import { StateProvider } from "@/context/StateContext";
import { reducer, initialState } from "@/context/StateReducers";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer/>
        </Layout>
      </StateProvider>
    </QueryClientProvider>
  );
}
