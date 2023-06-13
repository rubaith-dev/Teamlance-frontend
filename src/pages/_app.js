import "@/styles/globals.css";
import Layout from "./component/Layout";
import { StateProvider } from "@/context/StateContext";
import { reducer, initialState } from "@/context/StateReducers";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}
