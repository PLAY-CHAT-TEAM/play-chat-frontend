import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { wrapper } from "@/store/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function WrappedApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default wrapper.withRedux(WrappedApp);
